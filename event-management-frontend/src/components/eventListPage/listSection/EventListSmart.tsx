import React from 'react';
import EventDetailsDumb from "./EventDetailsDumb";
import { connect } from 'react-redux';
import { fetchAllEvents } from '../../../actions/EventsPageActions'
import { AppState } from "../../../store/store";
import EventListDumb from "./EventListDumb";
import { fetchCustomEvents, updateSortCriteria, incrementPage, decrementPage, resetFilters } from "../../../actions/EventsPageActions";
import { EventFilters } from "../../../model/EventFilters";
import EventDetailsMobileDumb from "./EventDetailsMobileDumb";
import { EventSort } from '../../../model/EventSort';
import { getLastNumber } from '../../../api/EventsServiceAPI';
import { Event } from "../../../model/Event";


interface Props {
    events: [];
    eventsSort: EventSort;
    filters: EventFilters;
    isLoading: boolean;
    isError: boolean;
    fetchAllEvents: () => { type: string; };
    page: number;
    fetchCustomEvents: (filters: EventFilters, sort: EventSort, page: number) => void;
    updateSortCriteria: (sortCriteria: EventSort) => void;
    incrementPage: () => void;
    decrementPage: () => void;
    resetFilters: () => void;
}

interface State {
    sortCriteria: string;
    sortType: string;
    lastPage: number;
    lastFilters:  EventFilters;
}

class EventListSmart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sortCriteria: '',
            sortType: '',
            lastPage: -1,
            lastFilters: {} as EventFilters
        };
    }

    componentWillMount() {
        this.props.fetchAllEvents();
        getLastNumber(this.props.filters).then(result => {
            this.setState({
                lastPage: result
            })
        });
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.eventsSort.criteria !== this.props.eventsSort.criteria ||
            prevProps.eventsSort.type !== this.props.eventsSort.type ||
            prevProps.page !== this.props.page) {
            this.props.fetchCustomEvents(this.props.filters, this.props.eventsSort, this.props.page)
        }
    
        if (Object.entries(this.props.filters).toString() !== Object.entries(this.state.lastFilters).toString()) {
            this.setState({
                lastFilters: Object.assign({}, this.props.filters)
            })
            getLastNumber(this.props.filters).then(result => {
                this.setState({
                    lastPage: result
                })
            })
        }
    }

    componentWillUnmount() {
        this.props.resetFilters();
    }

    render() {
        let { events } = this.props;

        const handleSortEvent = (criteria: string, type: string) => {
            const sortParams: EventSort = {
                criteria: criteria,
                type: type
            }
            if (sortParams.criteria === undefined || (criteria === this.state.sortCriteria && type === this.state.sortType)) {
                return
            }
            this.setState({ sortCriteria: criteria, sortType: type });
        }

        const goToPrevPage = () => {
            if (this.props.page < 1) {
                return
            } else {
                this.props.decrementPage();
            }
        }

        const goToNextPage = () => {
            if (this.props.page + 1 >= this.state.lastPage) {
                return
            } else {
                this.props.incrementPage();
            }
        }

        // Using the map function, we will get all the events from the array 
        const eventDetails = events?.map((event: Event) =>
                <EventDetailsDumb key={event.id} event={event} />);
        // On mobile we would like to keep only title and date
        const eventDetailsMobile = events?.map((event: Event) =>
                <EventDetailsMobileDumb key={event.id} event={event} />);

        return (
            <EventListDumb
                isLoading={this.props.isLoading}
                isError={this.props.isError}

                updateSortCriteria={this.props.updateSortCriteria}
                incrementPage={goToNextPage}
                decrementPage={goToPrevPage}
                sort={this.props.eventsSort}
                filters={this.props.filters}
                page={this.props.page}
                lastPage={this.state.lastPage}

                eventsDetails={eventDetails}
                eventsDetailsMobile={eventDetailsMobile}
                handleSortEvent={handleSortEvent}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage} />
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    events: state.events.allEvents,
    isLoading: state.events.isLoading,
    isError: state.events.isError,
    eventsSort: state.events.eventsSort,
    page: state.events.page,
    filters: state.events.filters
});

export default connect(mapStateToProps, { fetchAllEvents, fetchCustomEvents,
    updateSortCriteria, incrementPage, decrementPage, resetFilters })(EventListSmart);

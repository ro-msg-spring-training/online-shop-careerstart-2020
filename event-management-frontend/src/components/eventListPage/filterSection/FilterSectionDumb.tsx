import React, { FormEvent, KeyboardEvent } from 'react';
import { Grid, TextField, Button, Select, MenuItem, Checkbox, FormControlLabel, InputAdornment, Collapse } from '@material-ui/core'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { MathRelation } from '../../../model/MathRelation';
import { formatDate } from '../../../utils/formatDate';
import { useFilterStyles } from '../../../styles/filterStyles';
import { useStyles } from '../../../styles/CommonStyles';
import { EventFiltersProps } from '../../../types/EventFiltersProps';


interface Props {
    isExpanded: boolean,
    filters: EventFiltersProps,
    errorRate: string,
    errorMaxPeople: string,
    updateFilters: (filters: EventFiltersProps) => void,
    toggle: () => void,
    submitForm: (event: FormEvent<HTMLFormElement>) => void,
    restrictNumberInput: (event: KeyboardEvent<HTMLDivElement>) => void
    handleChangeTitle: (title: string) => void,
    handleChangeSubtitle: (subtitle: string) => void,
    handleChangeLocation: (location: string) => void,
    handleChangeStatus: (status: string) => void,
    handleChangeHighlighted: (highlighted: boolean) => void,
    handleChangeStartHour: (startHour: string) => void,
    handleChangeEndHour: (endHour: string) => void,
    handleChangeDate: (date: Date | [Date, Date] | null) => void,
    handleChangeMaxPeople: (maxPeople: string) => void,
    handleChangeMaxPeopleSign: (maxPeopleSign: MathRelation) => void,
    handleChangeRate: (rate: string) => void,
    handleChangeRateSign: (rateSign: MathRelation) => void,
}


function FilterSectionDumb(props: Props) {
    const classes = useFilterStyles()
    const commonClasses = useStyles()

    const displayDate = () => {
        let result = ''

        if (props.filters.startDate !== null) {
            result += formatDate(props.filters.startDate, '/')
        }

        if (props.filters.endDate !== null) {
            result += " to " + formatDate(props.filters.endDate, '/')
        }

        return result
    }

    return (
        <form onSubmit={event => props.submitForm(event)} className={classes.filterArea}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={10}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={4}>
                            <TextField
                                label="Title"
                                onChange={(e) => props.handleChangeTitle(e.target.value)}
                                fullWidth
                                variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <TextField
                                label="Subtitle"
                                onChange={(e) => props.handleChangeSubtitle(e.target.value)}
                                fullWidth
                                variant="outlined" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={4}>
                            <TextField
                                select
                                variant="outlined"
                                label="Status"
                                value={props.filters.status}
                                onChange={(e) => props.handleChangeStatus(e.target.value as string)}
                                fullWidth>

                                <MenuItem value={'true'}>Active</MenuItem>
                                <MenuItem value={'false'}>Inactive</MenuItem>
                                <MenuItem value={'none'}>Not set</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>

                    <Collapse in={!props.isExpanded} timeout={500} className={classes.collapseArea}>
                        <Grid container
                            spacing={3}>

                            <Grid item xs={12} sm={12} md={4}>
                                <TextField
                                    label="Location"
                                    onChange={(e) => props.handleChangeLocation(e.target.value)}
                                    fullWidth
                                    variant="outlined" />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4}>
                                <div className={classes.customDatePickerWidth}>
                                    <DatePicker
                                        className={classes.datePicker}
                                        selected={props.filters.startDate}
                                        startDate={props.filters.startDate}
                                        endDate={props.filters.endDate}
                                        selectsRange
                                        value={displayDate()}
                                        onChange={(e) => props.handleChangeDate(e)}
                                        customInput={<TextField label="Date" variant="outlined" />} />
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} className={classes.timeArea}>
                                <TextField
                                    className={classes.timeInput}
                                    label="Start hour"
                                    variant="outlined"
                                    type="time"
                                    value={props.filters.startHour}
                                    onChange={(e) => props.handleChangeStartHour(e.target.value)} />

                                <div>
                                    to
                            </div>

                                <TextField
                                    className={classes.timeInput}
                                    label="End hour"
                                    variant="outlined"
                                    type="time"
                                    value={props.filters.endHour}
                                    onChange={(e) => props.handleChangeEndHour(e.target.value)} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} className={classes.relationArea}>
                                <Select
                                    disableUnderline={true}
                                    className={classes.relationSelect}
                                    value={props.filters.maxPeopleSign}
                                    onChange={e => props.handleChangeMaxPeopleSign(e.target.value as MathRelation)}>

                                    <MenuItem value={MathRelation.GREATER}>&gt;</MenuItem>
                                    <MenuItem value={MathRelation.LOWER}>&lt;</MenuItem>
                                    <MenuItem value={MathRelation.EQUAL}>=</MenuItem>
                                </Select>

                                <TextField
                                    variant="outlined"
                                    error={props.errorMaxPeople !== ''}
                                    label={props.errorMaxPeople ? `Max number of people - ${props.errorMaxPeople}` : 'Max number of people'}
                                    type='number'
                                    InputProps={{
                                        inputProps: {
                                            min: 0
                                        }
                                    }}
                                    onKeyPress={(e) => props.restrictNumberInput(e)}
                                    onChange={(e) => props.handleChangeMaxPeople(e.target.value)}
                                    fullWidth />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} className={classes.relationArea}>
                                <Select
                                    className={classes.relationSelect}
                                    value={props.filters.rateSign}
                                    disableUnderline={true}
                                    onChange={e => props.handleChangeRateSign(e.target.value as MathRelation)} >

                                    <MenuItem value={MathRelation.GREATER}>&gt;</MenuItem>
                                    <MenuItem value={MathRelation.LOWER}>&lt;</MenuItem>
                                    <MenuItem value={MathRelation.EQUAL}>=</MenuItem>
                                </Select>

                                <TextField
                                    label={props.errorRate ? `Occupacy rate - ${props.errorRate}` : 'Occupacy rate'}
                                    variant="outlined"
                                    type='number'
                                    error={props.errorRate !== ''}
                                    InputProps={{
                                        inputProps: {
                                            max: 100, min: 0,
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                %
                                            </InputAdornment>
                                        )
                                    }}
                                    onKeyPress={(e) => props.restrictNumberInput(e)}
                                    onChange={(e) => props.handleChangeRate(e.target.value)}
                                    fullWidth />
                            </Grid>

                            <Grid item xs={12} sm={12} md={4} className={classes.highlightedCheckbox}>
                                <FormControlLabel
                                    control=
                                    {
                                        <Checkbox onChange={(e) => props.handleChangeHighlighted(e.target.checked)} />
                                    }
                                    label="Highlighted"
                                    labelPlacement="end"
                                />
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>

                <Grid item xs={12} sm={2} className={classes.filterButtonsArea}>
                    <Button
                        type='submit'
                        disabled={props.errorRate !== '' || props.errorMaxPeople !== ""}
                        className={`${commonClasses.buttonStyle2} ${commonClasses.buttonStyle3}`}>
                        Filter
                    </Button>

                    <div onClick={props.toggle} className={classes.filterExpandText}>
                        {
                            props.isExpanded ? "See less filters" : "See more filters"
                        }
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}

export default FilterSectionDumb;

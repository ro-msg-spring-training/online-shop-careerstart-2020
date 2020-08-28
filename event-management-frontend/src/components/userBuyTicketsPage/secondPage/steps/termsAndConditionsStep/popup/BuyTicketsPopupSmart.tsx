import React from 'react';
import BuyTicketsPopupDumb from './BuyTicketsPopupDumb';

interface BuyTicketsPopupSmartProps {
  open: boolean,
  setOpen: any,
  checked: boolean,
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleProceedToBuy: () => void,
}

function BuyTicketsPopupSmart({ open, setOpen, checked, handleCheckboxChange, handleProceedToBuy }: BuyTicketsPopupSmartProps) {

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = (): void => {
    setOpen(false);
    handleProceedToBuy();
  }

  const handleCancel = (): void => {
    setOpen(false);
  }

  return (
    <BuyTicketsPopupDumb
      open={open}
      checked={checked}
      handleCheckboxChange={handleCheckboxChange}
      handleClose={handleClose}
      handleCancel={handleCancel}
      handleProceed={handleProceed}
    />
  );
}

export default BuyTicketsPopupSmart;

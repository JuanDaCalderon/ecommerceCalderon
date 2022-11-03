import React from 'react'
import { FormControl, InputLabel, OutlinedInput, InputAdornment, ButtonGroup, Button } from '@mui/material'

const ItemCount = ({ amount, sumaHandleClick, restaHandleClick }) => {
    return (
        <>
            <FormControl sx={{ mx: 1 }}>
                <InputLabel htmlFor="Quantity">Quantity</InputLabel>
                <OutlinedInput
                    id="Quantity"
                    value={amount}
                    startAdornment={<InputAdornment position="start">Und</InputAdornment>}
                    label="Amount"
                    size="small"
                />
            </FormControl>
            <ButtonGroup
                variant="contained"
                aria-label="quantity"
            >
                <Button onClick={sumaHandleClick}>+</Button>
                <Button onClick={restaHandleClick}>-</Button>
            </ButtonGroup>
        </>
    )
}

export default ItemCount
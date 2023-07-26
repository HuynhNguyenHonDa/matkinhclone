import React, { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";
import { duration } from "@mui/material";
interface SnackbarCustomProps {
    open: boolean,
    onClose: any,
    severity: "error" | "warning" | "info" | "success",
    duration: number
}
export const SnackbarCustom = (props: SnackbarCustomProps) => {

    return (
        <Snackbar open={props.open} autoHideDuration={props.duration} onClose={props.onClose}>
            <Alert onClose={props.onClose} severity={props.severity} sx={{ width: '100%' }}>
                Thêm vào giỏ hàng thành công!
            </Alert>
        </Snackbar>
    )
}
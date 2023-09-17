import React from 'react'
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from '@mui/lab'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import SellIcon from '@mui/icons-material/Sell'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { Dialog, Typography } from '@mui/material'

const ProductTimeline = ({
    productHistory,
    open,
    onClose
}) => {
    const generateTimelineDot = (index) => {
        if (index === 0) {
            return (
                <TimelineDot>
                    <PrecisionManufacturingIcon />
                </TimelineDot>
            )
        } else if (index === 1) {
            return (
                <TimelineDot color='primary'>
                    <LocalShippingIcon />
                </TimelineDot>
            )
        } else if (index === 2) {
            return (
                <TimelineDot color='primary' variant='outlined'>
                    <SellIcon />
                </TimelineDot>
            )
        } else {
            return (
                <TimelineDot color='secondary'>
                    <PublishedWithChangesIcon />
                </TimelineDot>
            )
        }
    }

    return (
        <Dialog
            onClose={onClose}
            open={open}
            fullWidth
            maxWidth='md'
            scroll='body'
            sx={{
                '.MuiPaper-root': {
                    paddingY: 4
                }
            }}
        >
            <Timeline position='alternate'>
                {productHistory.map((item, index) => (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align='right'
                            variant='body2'
                            color='text.secondary'
                        >
                            {item.date}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            {generateTimelineDot(index)}
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant='h6' component='span'>
                                {item.action}
                            </Typography>
                            <Typography>{item.details}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Dialog>
    )
}

export default ProductTimeline

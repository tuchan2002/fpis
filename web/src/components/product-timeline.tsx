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
import { Typography } from '@mui/material'

interface IHistoryItem {
    timestamp: string
    action: string
    details: string
}
const ProductTimeline = ({
    productHistory
}: {
    productHistory: IHistoryItem[]
}) => {
    const extractDateFromDetailsString = (details: string) => {
        const startIndex = details.indexOf('Date:')

        if (startIndex !== -1) {
            const dateSubstring = details
                .substring(startIndex + 'Date:'.length)
                .trim()
            return dateSubstring
        } else {
            return "'Date:' not found"
        }
    }

    return (
        <Timeline position='alternate'>
            {productHistory.map((item) => (
                <TimelineItem>
                    <TimelineOppositeContent
                        sx={{ m: 'auto 0' }}
                        align='right'
                        variant='body2'
                        color='text.secondary'
                    >
                        {extractDateFromDetailsString(item.details)}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot>
                            <PrecisionManufacturingIcon />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant='h6' component='span'>
                            {item.action}
                        </Typography>
                        <Typography>Because you need strength</Typography>
                    </TimelineContent>
                </TimelineItem>
            ))}

            {/* <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align='right'
                    variant='body2'
                    color='text.secondary'
                >
                    9:30 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <PrecisionManufacturingIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant='h6' component='span'>
                        Eat
                    </Typography>
                    <Typography>Because you need strength</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant='body2'
                    color='text.secondary'
                >
                    10:00 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color='primary'>
                        <LocalShippingIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant='h6' component='span'>
                        Code
                    </Typography>
                    <Typography>Because it&apos;s awesome!</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color='primary' variant='outlined'>
                        <SellIcon />
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant='h6' component='span'>
                        Sleep
                    </Typography>
                    <Typography>Because you need rest</Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                    <TimelineDot color='secondary'>
                        <PublishedWithChangesIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant='h6' component='span'>
                        Repeat
                    </Typography>
                    <Typography>Because this is the life you love!</Typography>
                </TimelineContent>
            </TimelineItem> */}
        </Timeline>
    )
}

export default ProductTimeline

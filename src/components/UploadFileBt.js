import React from 'react'
import { Box } from '@mui/material'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import { ProductionQuantityLimitsSharp } from '@mui/icons-material'

function UploadFileBt(props) {
  const [file,setFile] = React.useState('')
  return (
    <Box
            sx={{
              width: 80,
              height: 63,
              backgroundColor: 'black',
              '&:hover': {
                backgroundColor: 'black',
                opacity: [0.9, 0.8, 0.7],
              },
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              flexDirection: "column",
            }}
            // onClick={handleClick}
          ><AddCircleRoundedIcon />
          <p>{props.name}</p>
          </Box>
  )
}

export default UploadFileBt

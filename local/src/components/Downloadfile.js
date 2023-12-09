import React from 'react'
import { styled,Grid,Button,Typography } from '@mui/material'
import DownloadIcon from "@mui/icons-material/Download";

const ItemBox = styled(Grid)(({theme}) => ({
    textAlign:"center",
    padding:theme.spacing(1)
 }))

function Downloadfile(props) {
    const handleDownload = () => {
        alert("Downloading");
      };

  return (
    <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={6}>
            <ItemBox>
              <Typography sx={{textAlign:'left'}}>{props.text}</Typography>
            </ItemBox>
          </Grid>
          <Grid item xs={6}>
            <ItemBox sx={{textAlign:'end'}}>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
              >
                Download
              </Button>
            </ItemBox>
          </Grid>
        </Grid>
  )
}

export default Downloadfile
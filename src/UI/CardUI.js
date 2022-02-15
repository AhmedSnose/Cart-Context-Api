import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';




function CardUI(props) {
  const {id, name , url , price , description , amount} = props.item

  const upCliclHandler = ()=>{
    props.clickBtn(props.item)
  }

  // console.log(props.isUser);

  return (
    <Box className='my-3 text-center w-30' sx={{ minWidth: 275 }}>
     <Card variant="outlined">
     <CardContent className='h-[200px]'>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
          <img className='w-40 max-h-[100px] object-contain' src={url} alt='img' />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {price} $
        </Typography>
        <Typography variant="body2">
          {/* {description} */}
          lorem ipsum ....
        </Typography>
      </CardContent>
      <CardActions>
       {!props.isCartPage && props.isUser && <Button onClick={upCliclHandler} className='' size="small">buy</Button>}
       {!props.isUser && !props.isCartPage && <p>🔒</p>}
       {props.isCartPage && (
         <div className='flex justify-around '>
           <p>Amount {amount}</p>
            <div className='ml-auto p-2 m-2'>
              <span onClick={props.onAddItem}>➕</span>
              <span onClick={props.onRemoveItem}>➖</span>
            </div>
         </div>
       )}


       

      </CardActions>
     </Card>
    </Box>
  )
}

export default CardUI
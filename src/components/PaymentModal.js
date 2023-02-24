import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stripe from 'stripe';
import StripeCheckout from 'react-stripe-checkout';
import { SearchContext } from '../contexts/SearchValue';
import axios from '../axios/axios'
import { Navigate, useNavigate } from 'react-router-dom';


const secretKey = process.env.REACT_APP_STRIPE_SECRET_KEY;
const stripe = Stripe(secretKey);


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#434343',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate()

  const handleToken = (token) => {
    // Do something with the token
    console.log('11111111111',token);
    handlePurchase()
    handleClose()
    props.primeTrigger()
    props.feedCall()
  };

 

  const {errorAlert,setErrorAlert,setErrorMsg,setFeedPost,setPostbool} = React.useContext(SearchContext) 

  const getFeed = (e) => {
    axios.get("feedPost").then((response) => {
      setFeedPost(response.data);
      setPostbool(true)
    });
  };

  const price = props.price * 100
  console.log('yyyyyyyy',secretKey);

  const hiddenPayBt = React.useRef(null);

  const handlePayClick =(event)=>{
    hiddenPayBt.current.click()
  }

  const handleClosePay=()=>{
    setErrorAlert(true)
    setErrorMsg('payment didnot complete...! Error occured')
  }

  const handlePurchase = () => {
    let details = { postid:props.postid, userid: props.userid };
    axios.post("dummyPurchase", details).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>Purchase</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" color='darkgrey' variant="h4" component="h2">
            Purchase this Premium Source Code
          </Typography>
          <br></br>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          {/* <Button onClick={(e)=>handlePayClick(e)} variant='contained' color='success'>Pay With Card</Button> */}
        
          <StripeCheckout
            ref={hiddenPayBt}
            token={handleToken}
            stripeKey='pk_test_51MeX7zSCphxBFPezUlRkjz7kVAFZNmOvL3sLmY5C6fIPlPjIxrjIyiVSs6qKpW7Ozm0O1SuyaKG2NCB5D5kzZNwe00aI9eJI8q'
            amount={price}
            name='Enter Your card details'
            currency='inr'
            onError={()=>handleClosePay()}
        />
        </Box>
      </Modal>
    </div>
  );
}
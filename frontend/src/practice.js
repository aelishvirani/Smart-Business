import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, UpdateProduct } from '../../actions/productActions';
import HashLoader from "react-spinners/HashLoader";
import { Input, InputGroup } from '@chakra-ui/input';
import { Helmet } from 'react-helmet';
import { Box, Checkbox, Stack, Textarea, VStack } from '@chakra-ui/react';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';
import './Editproduct.css';

const Editproduct = ({ match, history }) => {
    const productId = match.params.id;
    const [name, setName] = useState('');
    const [description, setdescription] = useState('');
    const [price, setprice] = useState(0);
    const [countInStock, setcountInStock] = useState(0);
    const [Url1, setUrl1] = useState();
    const [Url2, setUrl2] = useState();
    const [Url3, setUrl3] = useState();

    const [Images, setImages] = useState([]);
    const [sizes, setsizes] = useState([]);
    const [category, setcategory] = useState([]);
    const [additionalSizes, setAdditionalSizes] = useState([]); // State for additional sizes
    const [newSize, setNewSize] = useState(''); // State for input value of new size

    const handleNewSizeChange = (e) => {
        setNewSize(e.target.value);
    };

    const handleAddSize = () => {
        if (newSize.trim() !== '') {
            setAdditionalSizes([...additionalSizes, newSize.trim()]);
            setNewSize(''); // Clear the input field after adding size
        }
    };

    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);

    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);

    const { loading: lodingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push('/admin/productlist');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setprice(product.price);
                setdescription(product.description);
                setUrl1(product.images[0]);
                setUrl2(product.images[1]);
                setUrl3(product.images[2]);
                setcategory(product.category);
                setsizes(product.sizes);
                setcountInStock(product.countInStock);
            }
        }
        return () => { };
    }, [dispatch, productId, history, product, successUpdate]);

    const submitHandler = (e) => {
        Images.push(Url1);
        Images.push(Url2);
        Images.push(Url3);

        e.preventDefault();
        dispatch(UpdateProduct({
            _id: productId,
            name,
            price,
            Images,
            category: [...category, ...additionalSizes], // Include additional sizes
            sizes,
            countInStock,
            description
        }));
    };

    const checkboxhandler = (D) => {
        let index = sizes.indexOf(D);
        if (index > -1) {
            sizes.splice(index, 1);
        } else {
            sizes.push(D);
        }
    };

    const checkboxhandlercg = (D) => {
        let index = category.indexOf(D);
        if (index > -1) {
            category.splice(index, 1);
        } else {
            category.push(D);
        }
    };

    return (
        <div className='Edituser'>
            <Helmet>
                <title>Edit Product</title>
            </Helmet>
            {error && <h4>{error}</h4>}
            {loading || lodingUpdate ?
                <div className='loading'>
                    <HashLoader color={"#1e1e2c"} loading={lodingUpdate} size={40} />
                </div>
                :
                errorUpdate ? <h4>{errorUpdate}</h4> :
                    <div>
                        <h4 className='Edittitle'>Edit Product :</h4>
                        <div className='formedit'>
                            <form onSubmit={submitHandler}>
                                <div>
                                    <div className="input-div zz">
                                        Name :
                                        <div className="div">
                                            <InputGroup>
                                                <Input type="text" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
                                            </InputGroup>
                                        </div>
                                    </div>
                                    {/* Include other fields here */}
                                    <div className="input-div pass">
                                        Sizes:
                                        <div className="div">
                                            <Stack direction="row">
                                                {sizes.map((size, index) => (
                                                    <Checkbox key={index} onChange={() => { checkboxhandler(size); }} isChecked={size}>{size}</Checkbox>
                                                ))}
                                                {additionalSizes.map((size, index) => (
                                                    <Checkbox key={index + sizes.length} isChecked>{size}</Checkbox>
                                                ))}
                                                <InputGroup>
                                                    <Input type="text" value={newSize} onChange={handleNewSizeChange} placeholder="Add more sizes" />
                                                    <button type="button" onClick={handleAddSize}>Add Size</button>
                                                </InputGroup>
                                            </Stack>
                                        </div>
                                    </div>
                                    <div className="input-div pass">
                                        Urls for images:
                                        <div className="div urls">
                                            <Box>
                                                <Stack direction='column'>
                                                    <Input type='file' onChange={(e) => { setUrl1(e.target.value); }} />
                                                    <Input type='file' onChange={(e) => { setUrl2(e.target.value); }} />
                                                    <Input type='file' onChange={(e) => { setUrl3(e.target.value); }} />
                                                </Stack>
                                            </Box>
                                        </div>
                                    </div>
                                    {message && <h4 className='Message'>{message}</h4>}
                                    <input type="submit" className="btna2 postionbtnupdate" value="Update" />
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Editproduct;
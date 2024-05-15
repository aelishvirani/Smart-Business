import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleProductVisibility, listProducts } from '../../actions/productActions';
import { Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { color } from 'style-value-types';
import { Helmet } from 'react-helmet';
import './inventory.css'

const Inventory = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    const toggleVisibilityHandler = (productId, visibility) => {
        dispatch(toggleProductVisibility(productId, visibility));
        window.location.reload();
    };

    return (
        <>
            <Helmet>
                <title>Inventory</title>
            </Helmet>
            <h1 className='inventory' > Inventory :</h1>
            <div className='inventoryProduct'>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Name</Th>
                                <Th>Stock</Th>
                                <Th>Price</Th>
                                <Th>Category</Th>
                                <Th>Visibility</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {products.map(product => (
                                <Tr key={product._id}>
                                    <Td>{product._id}</Td>
                                    <Td>{product.name}</Td>
                                    {product.countInStock ? <Td style={{ color: "Green" }}>{product.countInStock} Items</Td> : <Td style={{ color: "red" }} > No Items</Td>}
                                    <Td>{product.price}</Td>
                                    <Td>{product.category.join(' | ')}</Td>
                                    <Td>
                                        {product.visibility ? (
                                            <Button style={{ background: "rgb(219, 66, 55)", color: "white" }} onClick={() => toggleVisibilityHandler(product._id, false)}>Hide</Button>
                                        ) : (
                                            <Button style={{ background: "rgb(39, 145, 15)", color: "white" }} onClick={() => toggleVisibilityHandler(product._id, true)}>Show</Button>
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )
                }
            </div >
        </>
    );
};

export default Inventory;






// import React, { useEffect } from 'react'
// import { DeleteProduct, listProducts, CreateProduct } from '../../actions/productActions';
// import { useDispatch, useSelector } from 'react-redux';
// import HashLoader from "react-spinners/HashLoader";
// import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';
// import './inventory.css'
// import {
//     Button, Table, Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     Stack,
//     Box,
// } from "@chakra-ui/react"
// import { Link } from 'react-router-dom';
// import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
// import { CgAdd } from 'react-icons/cg';
// import { Helmet } from 'react-helmet';

// const Inventory = ({ history, match }) => {
//     const dispatch = useDispatch()
//     const productList = useSelector(state => state.productList)
//     const { loading, error, products } = productList

//     const productDelete = useSelector(state => state.productDelete)
//     const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

//     const productCreate = useSelector(state => state.productCreate)
//     const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdproduct } = productCreate

//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin

//     useEffect(() => {
//         dispatch({ type: PRODUCT_CREATE_RESET })

//         if (!userInfo.isAdmin) {
//             history.push('/login')
//         }
//         if (successCreate) {
//             history.push(`/admin/product/${createdproduct._id}/edit`)
//         } else {
//             dispatch(listProducts())

//         }
//     }, [dispatch, history, userInfo, successDelete, successCreate, createdproduct])
//     const deletehandler = (id) => {
//         if (window.confirm('Are You Sure?')) {
//             dispatch(DeleteProduct(id))

//         }
//     }

//     const createproducthandler = () => {
//         dispatch(CreateProduct())
//     }
//     return (

//         <div className='Users'>
//             <Helmet>
//                 <title className='title-name'>products</title>
//             </Helmet>
//             <h1 className='titlepanel'> Products :</h1>
//             {loading || loadingDelete || loadingCreate ? <div className='loading'>
//                 <HashLoader color={"#1e1e2c"} loading={loading || loadingDelete || loadingCreate} size={40} />
//             </div> :
//                 error || errorDelete || errorCreate ? <h1>{error || errorDelete || errorCreate}</h1> :
//                     <>
//                         <Button leftIcon={<CgAdd size='20' />} className='ADDBUTTON' colorScheme='blue' onClick={createproducthandler}>ADD</Button>

//                         <Box overflowX='auto'>
//                             <Table className='productusers' variant="striped">
//                                 <Thead>
//                                     <Tr>
//                                         <Th w='10%'>ID</Th>
//                                         <Th w='20%'>Name</Th>
//                                         <Th w='20%'>Price</Th>
//                                         <Th w='20%'>Category</Th>
//                                         <Th w='10%'></Th>
//                                     </Tr>
//                                 </Thead>
//                                 <Tbody>
//                                     {products.map(product => (
//                                         <Tr key={product._id}>
//                                             <Td>{product._id}</Td>
//                                             <Td>{product.name}</Td>
//                                             <Td isNumeric>{product.price}</Td>
//                                             <Td>{product.category.join(' | ')}</Td>
//                                             <Td>
//                                                 <Stack>
//                                                     <Link to={`/admin/product/${product._id}/edit`}>
//                                                         <Button leftIcon={<AiOutlineEdit size='16' />} colorScheme='blue' size="xs"  >EDIT</Button>
//                                                     </Link>
//                                                     <Button colorScheme='red' leftIcon={<AiFillDelete size='16' />} size="xs" onClick={() => { deletehandler(product._id) }}>DELETE</Button>
//                                                 </Stack>
//                                             </Td>

//                                         </Tr>
//                                     ))}
//                                 </Tbody>
//                             </Table>
//                         </Box>
//                     </>
//             }

//         </div>
//     )
// }

// export default Inventory

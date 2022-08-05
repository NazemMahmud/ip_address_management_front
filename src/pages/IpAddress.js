import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import DashboardLayout from "../layout/DashboardLayout";
import Datatable from "../components/Datatable";
import PaginationComponent from "../components/PaginationComponent";
import { setHttpParams } from "../utility/utils";
import { getAllIp, getSingleIp } from "../services/ip.service";
import AddUpdateForm from "../components/AddUpdateForm";
import { toast, ToastContainer } from "react-toastify";
import ToastComponent from "../components/ToastComponent";
import { SOMETHING_WENT_WRONG } from "../config/constants";
import 'react-toastify/dist/ReactToastify.css';
import LoaderComponent from "../components/LoaderComponent";

const IpAddress = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const initialParams = {
        orderBy: queryParams.get("orderBy") ?? 'DESC',
        sortBy: queryParams.get("sortBy") ?? 'id',
        pageOffset: queryParams.get("pageOffset") ?? 10,
        page: queryParams.get("page") ?? 1
    };

    const actions = ['update'];

    const [isLoading, setIsLoading] = useState(true);
    const [isSetData, setIsSetData] = useState(false);
    const [params, setParams] = useState(initialParams);
    const [dataList, setDataList] = useState([]);
    const [oldIPData, setOldIPData] = useState({});
    const [columns, setColumns] = useState(['IP Address', 'Label']);

    useEffect(() => {
        if (actions.length) {
            setColumns([...columns, 'Action']);
        }
    }, []);

    // this info will come from API if it is paginated
    const [paginationInfo, setPaginationInfo] = useState({
        from: '',
        to: '',
        total: '',
        currentPage: '',
        perPage: '',
        lastPage: '',
        pageLimit: 3
    });

    /**
     * change url at the same time api call on params
     * so that individual URL can be used
     */
    const changeUrl = () => {
        const urlParams = setHttpParams(params);
        navigate(location.pathname + urlParams ? '?' + urlParams : '');
    };


    /** Get all/paginated ip address data for table **/
    useEffect( () => {
        getDataList();
    }, [params]);

    const getDataList = async () => {
        setIsLoading(true);
        await getAllIp(params)
            .then(res => {
                const response = res.data;
                setDataList(response.data);

                setPaginationInfo({
                    ...paginationInfo,
                    from: response.meta.from,
                    to: response.meta.to,
                    total: response.meta.total,
                    currentPage: response.meta.current_page,
                    perPage: response.meta.per_page,
                    lastPage: response.meta.last_page
                });
                setIsLoading(false);
                setIsSetData(true);
                changeUrl();
            })
            .catch(error => {
                setIsLoading(false);
                const errorMessage = error?.response?.data?.error ?? SOMETHING_WENT_WRONG;
                toast.error(<ToastComponent messages={errorMessage}/>);
            });
    };

    /**
     * change pagination / page id by clicking pagination component
     * it will trigger data list API call
     */
    const paginationCallback = page => {
        setParams({
            ...params,
            page: page,
        });
    };

    /**
     * After add new ip address, update data table
     * Show the new data at top
     * Update pagination info
     * @param data
     */
    const ipAddCallback = data => {
        if (params.page == 1) {
            const newDataList = [...dataList];
            newDataList.unshift(data);
            setDataList(newDataList);
            setPaginationInfo({
                ...paginationInfo,
                to: paginationInfo.to + 1,
                total: paginationInfo.total + 1,
            });
            setIsLoading(false);
        } else {
            setParams({
                ...params,
                page: 1,
            });
        }
    };

    /**
     * After update ip address, update in the data table
     * @param updatedData
     */
    const ipUpdateCallback = updatedData => {
        const newDataList = [...dataList];
        const findIndex = dataList.findIndex(item => item.id == updatedData.id);
        newDataList[findIndex] = updatedData;
        setDataList([...newDataList]);
        setOldIPData({});
        setIsLoading(false);
    };

    const loaderCallback = data => {
        setIsLoading(data);
    };

    /**
     * Call API & populate update form
     */
    const handleEditCallback = async id => {
        setIsLoading(true);
        await getSingleIp(id)
            .then(res => {
                const response = res.data;
                setOldIPData({ ...response.data });
                setIsLoading(false);
            })
            .catch(error => {
                const errorMessage = error?.response?.data?.error ?? SOMETHING_WENT_WRONG;
                toast.error(<ToastComponent messages={errorMessage}/>);
                setIsLoading(false);
            });
    };

    return (
        <DashboardLayout logoutCallback={loaderCallback}>
            <ToastContainer position={"top-right"}
                            autoClose={3000}
                            hideProgressBar={false}
                            closeOnClick
                            pauseOnFocusLoss
                            draggable/>
            <LoaderComponent isLoading={isLoading} />

            <Row className="mb-5">
                <Col>
                    <Card >
                        <Card.Body>
                            <AddUpdateForm updateData={oldIPData}
                                           ipAddCallback={ipAddCallback}
                                           ipUpdateCallback={ipUpdateCallback}
                                           loaderCallback={loaderCallback} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    {
                        isSetData ?
                            <Datatable data={dataList}
                                       columns={columns}
                                       handleEditCallback={handleEditCallback}
                                       actions={actions} /> : <></>
                    }
                </Col>
            </Row>
            {
                dataList.length ?
                    <PaginationComponent paginationInfo={paginationInfo}
                                                        paginationCallback={paginationCallback}
                    /> : <></>
            }

        </DashboardLayout>
    );
};

export default IpAddress;

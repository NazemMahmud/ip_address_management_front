import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Card, Row, Col } from "react-bootstrap";
import Datatable from "../../components/Datatable";
import { getAllIp, getSingleIp } from "../../services/ip.service";
import PaginationComponent from "../../components/PaginationComponent";
import { setHttpParams } from "../../utility/utils";
import { useLocation, useNavigate } from "react-router-dom";
import AddUpdateForm from "../../components/AddUpdateForm";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const initialParams = {
        orderBy: queryParams.get("orderBy") ?? 'DESC',
        sortBy: queryParams.get("sortBy") ?? 'id',
        pageOffset: queryParams.get("pageOffset") ?? 10,
        page: queryParams.get("page") ?? 1
    };

    const [isLoading, setIsLoading] = useState(true);
    const [params, setParams] = useState(initialParams);
    const [dataList, setDataList] = useState([]);
    const [oldIPData, setOldIPData] = useState({});

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
                changeUrl();
            })
            .catch(error => {
                setIsLoading(false);
                // TODO: add a toaster
                console.log('error..', error);
            });
        // TODO: add a loader
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
    };

    /**
     * Call API & populate update form
     */
    const handleEditCallback = async id => {
            await getSingleIp(id)
                .then(res => {
                    const response = res.data;
                    console.log(response);
                    setOldIPData({ ...response.data });
                })
                .catch(error => {
                    // TODO: add a toaster
                    console.log('error..', error);
                });
            // TODO: add a loader
    };

    return (
        <DashboardLayout>
            <Row className="mb-5">
                <Col>
                    <Card >
                        <Card.Body>
                            <AddUpdateForm updateData={oldIPData}
                                           ipAddCallback={ipAddCallback}
                                           ipUpdateCallback={ipUpdateCallback} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    {
                        isLoading ? <></> : <Datatable data={dataList} handleEditCallback={handleEditCallback}/>
                    }
                </Col>
            </Row>
            {
                !isLoading && dataList.length ?
                    <PaginationComponent paginationInfo={paginationInfo}
                                                        paginationCallback={paginationCallback}
                    /> : <></>
            }

        </DashboardLayout>
    );
};

export default Dashboard;

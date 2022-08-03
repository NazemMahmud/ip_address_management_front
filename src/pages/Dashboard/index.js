import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Card, Row, Col } from "react-bootstrap";
import Datatable from "../../components/Datatable";
import { getAllIp } from "../../services/ip.service";
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
        pageOffset: queryParams.get("pageOffset") ?? 2,
        page: queryParams.get("page") ?? 1
    };

    const [params, setParams] = useState(initialParams);
    const [dataList, setDataList] = useState([]);

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

                changeUrl();
            })
            .catch(error => {
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

    return (
        <DashboardLayout>
            <Row className="mb-5">
                <Col>
                    <Card >
                        <Card.Body>
                            <AddUpdateForm />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Datatable data={dataList}/>
                </Col>
            </Row>
            {
                dataList.length && <PaginationComponent paginationInfo={paginationInfo}
                                                        paginationCallback={paginationCallback} />
            }

        </DashboardLayout>
    );
};

export default Dashboard;

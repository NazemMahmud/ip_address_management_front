import React from "react";
import { Modal, Button, Card, Row, Col, Badge } from "react-bootstrap";


const AuditDetails = ({ data, isOpen, closeCallback }) => {

    const formatDataValues = value => {
        let item = JSON.parse(value);
        return  JSON.stringify(item, null, 4);
    };

    /**
     * event with badge ui
     * @param data
     */
    const formatEventData = data => {
        switch (data) {
            case 'created':
                data = <h5 > <Badge className="font-weight-normal p-2" bg="success">{data}</Badge> </h5>;
                break;
            case 'updated':
                data = <h5 > <Badge className="font-weight-normal p-2" bg="info">{data}</Badge> </h5>;
                break;
            default:
                break;
        }

        return data;
    };

    return (
        <Modal show={isOpen} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title> Audit Log Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card>
                    <Card.Body>
                        {
                            Object.keys(data).map(property => {
                                return (
                                    <Row key={property} style={{
                                        marginBottom: '10px'
                                    }}>
                                        <Col>
                                            <Card>
                                                <Card.Body>
                                                    <Row>
                                                        <Col xs={3} ms={3} lg={3} sm={3}> <h5>{property} : </h5>< /Col>
                                                        <Col>
                                                            {
                                                                (property === 'old_values' || property === 'new_values') ?
                                                                    <pre dangerouslySetInnerHTML={{
                                                                        __html: formatDataValues(data[property]),
                                                                    }} />  : ( (property === 'event') ?
                                                                        formatEventData( data[property] )
                                                                : `${data[property]}` )
                                                            }
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>

                                        </Col>
                                    </Row>
                                );
                            })
                        }
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeCallback}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AuditDetails;

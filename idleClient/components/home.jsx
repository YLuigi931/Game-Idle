import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function Home(){
	return (
		<>
    <Row xs={2} xxl={4} lg={3} className="g-4">
      	{Array.from({ length: 8 }).map((_, idx) => (
	<>
    <Col>
         <Card className='card'>
         <Card.Body>
         <Card.Title>Card title</Card.Title>
         <Card.Text>
         This is a longer card with supporting text below as a natural
         lead-in to additional content. This content is a little bit
         longer.
         </Card.Text>
         </Card.Body>
         </Card>
    </Col>
	</>
	))}
    </Row>
    	<Row xs={1} md={2} className="box g-4" style={{margin:0}}>
	<Col>
	<p className='text-center'>just a text test</p>
	<p className='text-center'>just a text test</p>
	<p className='text-center'>just a text test</p>
	<p className='text-center'>just a text test</p>
	<p className='text-center'>just a text test</p>
	</Col>
	<Col>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	<p className='text-center'>Another text test block</p>
	</Col>
	</Row>
		</>
	)
}
export default Home

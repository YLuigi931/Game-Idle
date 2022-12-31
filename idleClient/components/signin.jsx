import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

function SignInComp(){
	return (
	<>
	<div className='box position-absolute top-50 start-50 translate-middle'>
	<Form>
      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>

	<div className='input-group'>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
	<Button className='input-group-append'>Submit</Button>
	</div>
	</Form>	
	</div>

	</>
	)
}
export default SignInComp

import axios from "axios"

function Home(){



    const testAddItem = async () => {
        let character_name = "Test Character"
        let item = "Iron Sword"

        let myresponse = await axios.post('addItem/', {'character_name': character_name, 'item': item})
        console.log(myresponse.data)
    }

    const testDeleteItem = async () => {
        let character_name = "Test Character"
        let item = "Iron Sword"

        let myresponse = await axios.post('deleteItem/', {'character_name': character_name, 'item': item})
        console.log(myresponse.data)
    }


	return (
		<>
		<p>Jacob, was here</p>
		<p>On the home page</p>
		<p>bottom line</p>
        <button onClick={testAddItem} >Click to add item!</button>
        <button onClick={testDeleteItem} >Click to deleeet ittttttteeemmmmmmmmmmmmmmm item!</button>
		</>
	)
}
export default Home
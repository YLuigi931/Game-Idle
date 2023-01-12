import {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from 'axios'

function Home(){
	const [bobby, setBobby] = useState(true)
	const [robby, setRobby] = useState(true)
	const [roddy, setRoddy] = useState(true)
	const [boddy, setBoddy] = useState(true)
	const [bodd, setBodd] = useState(true)

	function CreateThis(){

		return (
			<>
			<p className='box2 text-center'>The Barbarian was born into a tribe of barbarians living on the outskirts of civilization. From a young age, he was trained in the ways of war and survival in the harsh wilderness. As he grew older, he became known as one of the strongest and most fearsome warriors in his tribe.

During a raid on a neighboring tribe, The Barbarian proved his worth in battle and earned the respect of his fellow warriors. He quickly rose through the ranks and became a leader among his people. However, despite his success as a warrior, The Dungeon Crasher felt a growing restlessness within him.

He began to seek out greater challenges and adventures, and soon found himself venturing into the dangerous dungeons that dotted the land. These dungeons were filled with traps, monsters, and untold riches, and The Barbarian relished the opportunity to put his strength and battle skills to the test.</p>
			</>
		)}


	function CreateThat(){
		return(
			<>
			<p className='box2 text-center'>
			The assassin grew up in a rough part of the city, where they had to learn to fend for themselves at a young age. They discovered they had a talent for sneaking and sneaking, and soon began to make a name for themselves as a skilled pickpocket. As they got older, they became more ambitious and started taking on bigger and more dangerous jobs. Eventually, they came to the attention of a shadowy organization of assassins, who recognized their potential and offered to take them in and train them as one of their own.

The assassin eagerly accepted, and quickly rose through the ranks of the organization, becoming one of their top operatives. They were sent on a wide variety of missions, from assassinating political targets to stealing important information. As they grew more skilled, they began to question the morality of the kills, especially when the organization starts killing innocent people for their own gain. They decided to leave the organization and since then, they use their skills to take out only the truly deserving targets, ones who are corrupt and threaten the safety and well-being of the common people. Now they are on a personal crusade, traveling through the dungeon and fighting against the forces of evil, using their stealth and deadly abilities to take out powerful monsters and nefarious bosses that threaten the realm.
			</p>
			</>
		)}
	function CreateThit(){
		return(
			<>
			<p className='box2 text-center'>
			Born into a poor peasant family, the wizard had a hard life growing up. They often found solace in the stories of powerful sorcerers and wizards, who could make the impossible happen with a wave of their hand. One day, while out exploring the countryside, the wizard stumbled upon a mysterious tome hidden in the roots of an ancient tree. It was filled with arcane knowledge and spells that the young wizard couldn't comprehend, but they knew that this was their chance to change their fate.

They spent years studying the ancient tome, and soon found that they had an innate talent for magic. They learned to harness the power of the elements, and soon began to perform small spells and incantations. They knew that they had to leave their small village and seek out a more experienced wizard to help them hone their craft.

After months of wandering, the wizard finally found a wise old wizard who agreed to take them on as an apprentice. Under the old wizard's tutelage, the young apprentice learned the ways of true magic, and soon became a skilled and powerful sorcerer.

But the wizard's training is not complete yet. they now sets out on journey to explore ancient tombs, forgotten ruins and mystical places in search of powerful artifacts and forbidden knowledge. This journey will help them to become a master of the arcane, and to finally reach their true potential as a powerful wizard.
			</p>
			</>
		)}
	function CreateThas(){
		return(
			<>
			<p className='box2 text-center'>
			Growing up in a small frontier village, the ranger was always drawn to the wilds of the forest. They spent most of their days exploring the woods, becoming proficient in tracking, hunting, and survival skills. It was not long before they came across a group of warriors, who were on a quest to protect the land from threats. The ranger was awestruck by their skills and joined them, becoming an apprentice under one of the experienced warrior.

Years of hard training honed their skills, and the ranger became a master of the bow and the sword, as well as a proficient tracker. They also became well-versed in the ways of the wild, gaining knowledge of the various creatures and plants that inhabit the forest.

The ranger's training was put to the test when their village was threatened by a band of orcs. They led the defense of the village and helped drive off the invaders. Following the successful defense, they decided to set out on a journey to explore the dangers that threaten the land, and to protect it from harm.

The ranger's knowledge of the wilderness and combat skills make them a valuable asset in a dungeon. They are able to track and hunt down their quarry with ease, and their proficiency with the bow and sword make them formidable in battle. Their skills in survival, tracking and familiarity with wilderness make them adept in navigating through rough terrain and dangerous environments. They are determined to use their skills to protect the land and its people from harm.

			</p>
			</>
		)}
	function CreateThese(){
		return(
			<>
			<p className='box2 text-center'>
			Growing up in a land plagued by war, the soldier was no stranger to the horrors of battle. They were orphaned at a young age and had to fend for themselves on the battlefields. They quickly learned how to survive by becoming proficient in the use of various weapons, and how to work effectively in a squad.

After several years of hard fighting, the soldier caught the attention of a military unit and was recruited as a recruit. Under the tutelage of experienced soldiers, the recruit honed their skills, becoming a skilled warrior and a valuable member of the unit. They took part in many battles and proved themselves to be a capable and brave fighter.

But despite their success, the soldier yearned for more. They wanted to do something meaningful, and so they left their unit and set out on a journey to seek out and destroy the greatest threats to the land, and to put their skills to the test.

The soldier's experience on the battlefield has made them a formidable opponent in the dungeon. They are highly skilled in the use of various weapons, and are able to work effectively in a squad. Their training has made them able to adapt to any situation and improvise under pressure, they are also familiar with different battle tactics and able to protect their teammates in combat. They are determined to use their skills and courage to defend the innocent, vanquish their foes and complete their objectives.

			</p>
			</>
		)}



	return (
		<>
        <Row md={5} className="box g-4" style={{margin:0}}>

	<Col>
	<p onClick={()=>{setBobby(!bobby)}} className='box2 text-center'>Barbarian Backstory</p>
	</Col>

	<Col>
	<p onClick={()=>{setRobby(!robby)}} className='box2 text-center'>Assassin Backstory</p>
	</Col>

	<Col>
	<p onClick={()=>{setRoddy(!roddy)}} className='box2 text-center'>Wizard Backstory</p>
	</Col>

	<Col>
	<p onClick={()=>{setBoddy(!boddy)}} className='box2 text-center'>Ranger Backstory</p>
	</Col>

	<Col>
	<p onClick={()=>{setBodd(!bodd)}} className='box2 text-center'>Soldier Backstory</p>
	</Col>

	</Row>
	<Row>{bobby ?null:<CreateThis/>} </Row>
	<Row> {robby ?null:<CreateThat/>}</Row>
	<Row>{roddy ?null:<CreateThit/>} </Row>
	<Row>{boddy ?null:<CreateThas/>} </Row>
	<Row> {bodd ?null:<CreateThese/>}</Row>
	</>
	)
}
export default Home
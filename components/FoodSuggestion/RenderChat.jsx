import { Image, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons, Feather, Ionicons, Entypo } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { theme } from '../../theme/index'
import { useMessage } from './MessageContext'
import { Skeleton } from 'moti/skeleton'

const RenderChat = ({props}) => {
  // const [loading, setLoading] = useState(false);
  const { listMessage, handleNewMessage,  handleNewResponse, fetchData} = useMessage();

  useEffect(() => {
    if (!props.isSend) {
        fetchData((response) => {
            handleNewResponse(props.id, response);
        });
    }

  }, []);
  console.log(props.id, ": RENDER")
  return (
    <View style={styles.container}>
		<View style={styles.sendContainer}>
			<View style={styles.avatarUser}>
			<Image style={styles.imageUser} source={require("../../assets/images/Profile/avatarTest.jpg")} />
			</View>
			<View style={styles.sendChat}>
			<Text style={styles.nameText}>Mr. Bean</Text>
			<Text style={styles.sendText}>{props.send}</Text>
			</View>
		</View>

		<View style={styles.responseContainer}>
			<View style={styles.avatarGPT}>
			{/* <Image style={styles.imageUser} source={require("../../assets/favicon.png")} /> */}
			<Feather name="slack" size={20} color={theme.colors.dark} />
			</View>
			<View style={styles.responseChat}>
			<Text style={styles.nameText}>Nhuqy</Text>
			<Skeleton
				colorMode='light'
				width={"90%"}
				height={14}
				radius={'round'}
			>

				{props.isSend ? 
				<Text style={styles.sendResponse}>{props.response}</Text>
				: null }
			</Skeleton>

			{props.isSend ? null : 
				<View style={{marginTop: 5}}>
					<Skeleton
						colorMode='light'
						width={"70%"}
						height={14}
						radius={'round'}
						/>
				</View>
			}
			{props.isSend ? null : 
				<View style={{marginTop: 5}}>
					<Skeleton
						colorMode='light'
						width={"40%"}
						height={14}
						radius={'round'}
						/>
				</View>
			}
			{props.isSend ? null : 
				<View style={{marginTop: 5}}>
					<Skeleton
						colorMode='light'
						width={"60%"}
						height={14}
						radius={'round'}
						/>
				</View>
			}
			</View>
		</View>
    </View>
  )
}

export default RenderChat

const styles = StyleSheet.create({
	container:{
		marginTop: 10,
		display: 'flex',
		gap: 10
	},
	nameText:{
		fontWeight: "600",
		marginBottom: 5
	},
	avatarUser:{
		display: 'flex',
		alignItems: 'center',
		marginRight: 15
	},
	avatarGPT:{
		width: 30,
		height: 30,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 15,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: theme.colors.lightGray
	},
	imageUser:{
		width: 30,
		height: 30,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: '#5360ac'
	},
	sendContainer:{
		display: 'flex',
		flexDirection: 'row',
	},
	sendChat:{
		// backgroundColor: 'tomato',
	},
	sendText:{
		marginBottom: 5,
	},
	
	responseContainer:{
		display: 'flex',
		flexDirection: 'row'
	},
	responseChat:{
	
	},
	sendResponse:{

	},
  
})
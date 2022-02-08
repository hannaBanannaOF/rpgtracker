import { Typography } from "antd";
import React from "react";
import { FaDiscord } from "react-icons/fa"

class DiscordCallbackScreen extends React.Component {
    render = () => {
        return (
            <div style={{ width: "100%", height: "100%", backgroundColor: "#7289da", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                <FaDiscord color="white" size={150} />
                <Typography.Title style={{ color: "white" }}>Authenticating</Typography.Title>
            </div>
        )
    }
}

export default DiscordCallbackScreen;
import React from "react";
import '../css/Leaderboard.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation} from 'react-router-dom';
import { ThemeContext } from "./App";

export default function Leaderboard(){

    const [leaderboardUsers, setLeaderboardUsers] = useState();

    useEffect(() => {
        getLeaderBoardData();

        function getLeaderBoardData(){
            let url = 'http://localhost:8000/player/';
            console.log(url)
            axios.get(url)
            .then(response => {
              let returnedUsers = response.data;
              setLeaderboardUsers(returnedUsers);
            })
          }
    }, [])

    return ( leaderboardUsers ? 
        <div className="leaderboard-div">
            <h3 className="leaderboard-header">Leaderboard</h3>
            <div className="leaderboard-users">
                    <ol>
                        {
                        leaderboardUsers.map(user => (
                        <li className="leaderboard-name" key={user.player_id}>{user.username}</li>
                    ))
                            }
                    </ol>
            </div>
         </div> : <div> Loading...</div>
    )
}
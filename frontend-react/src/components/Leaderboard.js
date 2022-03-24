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
            let url = 'https://teamcullenwebapp2.azurewebsites.net/player/leaderboard';
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
                    <div className="leaderboard-headings">
                        <p className="leaderboard-heading">USERNAME</p>
                        <p className="leaderboard-heading">WINS</p>
                        <p className="leaderboard-heading">LOSSES</p>
                    </div>
                    <ol>
                        {
                        leaderboardUsers.map(user => (
                                 <li className="leaderboard-li" key={user.player_id}>
                                     <div className="leaderboard-li-div">
                                        <div>
                                            <p className="leaderboard-name">{user.username}</p>
                                        </div>
                                        <div>
                                            <p>{user.wins}</p>
                                        </div>
                                        <div>
                                            <p>{user.loses}</p>
                                        </div>
                                     </div> 
                                 </li>
                    ))
                            }
                    </ol>
            </div>
         </div> : 
                 <h1 className="loading">Loading...</h1>
               
    )
}
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "@mkyy/mui-search-bar";
import MediaGrid from "../../Components/MediaGrid";
import "./style.css";
import { apiKey, BASE_URL } from "../../../env.js";
import backgroundImage from "./img/movies.jpeg";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { addFriend } from "../../Functions/addFriend";
import { declineFriendRequest } from "../../Functions/declineFriendRequest.js";
import { acceptFriendRequest } from "../../Functions/acceptFriendRequest";
import { useFriendRequests } from "../../Hooks/useFriendRequests";
import { useFriends } from "../../Hooks/useFriends";
import { useSearchFriends } from "../../Hooks/useSearchUsers";
const Search = () => {
    const [textFieldValue, setTextFieldValue] = useState(""); // Start with an empty search query
    const [reload, setReload] = useState(false);
    const { user } = useAuthContext();

    const {
        friendRequests,
        isPending: isPendingFriendRequests,
        error: errorFriendRequests,
    } = useFriendRequests(user.username, reload);

    const {
        friends,
        isPending: isPendingFriends,
        error: errorFriends,
    } = useFriends(user.username, reload);

    const {
        searchUsers,
        isPending: isPendingSearchUsers,
        error: errorSearchUsers,
    } = useSearchFriends(textFieldValue);

    const handleReload = () => {
        setReload(!reload); // Toggle the reload state to trigger re-fetching
    };

    return (
        <div>
            <SearchBar
                value={textFieldValue}
                onChange={(newValue) => {
                    setTextFieldValue(newValue);
                }}
                placeholder="Search Movie"
            />
            <div>
                <div>Friend list</div>
                <button onClick={handleReload}>Friend list</button>
                <div>
                    {errorFriends && <div>{errorFriends}</div>}
                    {isPendingFriends && <div>Loading...</div>}
                    {friends &&
                        friends.map((friend) => {
                            return (
                                <>
                                    <div> {friend}</div>
                                </>
                            );
                        })}
                </div>
                <div>Friend requests list</div>
                <button onClick={handleReload}>Friend Request</button>
                <div>
                    {errorFriendRequests && <div>{errorFriendRequests}</div>}
                    {isPendingFriendRequests && <div>Loading...</div>}
                    {friendRequests &&
                        friendRequests.map((friendRequest) => {
                            return (
                                <>
                                    <div> {friendRequest}</div>
                                    <button
                                        onClick={() =>
                                            acceptFriendRequest(
                                                user.username,
                                                friendRequest
                                            )
                                        }
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() =>
                                            declineFriendRequest(
                                                user.username,
                                                friendRequest
                                            )
                                        }
                                    >
                                        Decline
                                    </button>
                                </>
                            );
                        })}
                </div>
                <div>Users</div>
                <div>Hellow</div>
                {errorSearchUsers && <div>{errorSearchUsers}</div>}
                {isPendingSearchUsers && <div>Loading...</div>}
                {searchUsers &&
                    searchUsers.map((friend) => {
                        return (
                            <>
                                <div> {friend.username}</div>
                                <button
                                    onClick={() => {
                                        addFriend(
                                            user.username,
                                            friend.username
                                        );
                                    }}
                                >
                                    add
                                </button>
                            </>
                        );
                    })}
            </div>
        </div>
    );
};

export default Search;

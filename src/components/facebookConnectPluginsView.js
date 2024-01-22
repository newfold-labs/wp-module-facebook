import React, { useEffect, useState } from "react";
import { facebookLogout } from "../utils/helper.js";
import { Spinner } from "@wordpress/components";

const FacebookConnectPluginView = ({ fbLogin, loginInfo, getFbDetails }) => {
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => setLogoutLoading(false), []);

  const handleLogoutFb = async () => {
    setLogoutLoading(true);
    await facebookLogout().then(() => {
      getFbDetails();
    });
    setLogoutLoading(false);
  };
  return (
    fbLogin && (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            width="30px"
            fill="#405795"
            viewBox="0 0 24 24"
            style={{ marginRight: "10px" }}
          >
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
          </svg>
          <p
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              paddingLeft: "15px",
            }}
          >
            Facebook -
            <span style={{ fontWeight: "normal" }}>
              {loginInfo?.User?.profile?.email}
            </span>
          </p>
        </div>
        {logoutLoading ? (
          <Spinner />
        ) : (
          <button
            style={{
              color: "#286BDE",
            }}
            onClick={() => handleLogoutFb()}
          >
            Disconnect
          </button>
        )}
      </div>
    )
  );
};

export default FacebookConnectPluginView;

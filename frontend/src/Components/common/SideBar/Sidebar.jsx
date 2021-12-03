import React, { useState } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../../constants/routes";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import OpenSideBar from "./OpenSidebar";
import {
  UilDashboard,
  UilChart,
  UilUserCircle,
  UilSetting,
  UilBell,
  UilReact,
  UilSignOutAlt,
  UilUserSquare,
} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store/modules";

const cx = classNames.bind(styles);

function Sidebar(props) {
  const dispatch = useDispatch();
  const img_url = useSelector((state) => state.user.img_url);
  const grey = "#2f2f2f50";
  const blue = "#6563FF";
  const [isActive, setActive] = useState(false);
  const logOut = () => {
    dispatch(
      actions.saveAllUserInfo({
        email: "",
        name: "",
        img_url: "",
        nickName: "",
        category: [],
        upload_term: 0,
        inputName: "",
      })
    );
    dispatch(actions.saveYoutubeInfo({ channelUrl: "", channelTitle: "", channelImgUrl: "" }));
    dispatch(actions.loginSuccess({ success: Boolean(false) }));
  };
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      <div className={cx("sideBarContainer")}>
        <div className={cx("sideLogo")}>
          <Link className={cx("logo")} to={ROUTES.HOME}>
            <UilReact className={cx("sideLogoImage")} />
          </Link>
        </div>
        <div className={cx("sideIcon")}>
          <Link className={cx("logo")} to={ROUTES.DASHBOARD}>
            <UilDashboard className={cx("sideDashBoard")} style={props.id === 1 ? { color: blue } : { color: grey }} />
          </Link>
          <Link className={cx("logo")} to={ROUTES.CONTENTS}>
            <UilChart className={cx("sideContents")} style={props.id === 2 ? { color: blue } : { color: grey }} />
          </Link>
          {/* <Link className={cx("logo")} to={ROUTES.PROFILE}>
            <UilUserSquare className={cx("sideProfile")} style={props.id === 3 ? { color: blue } : { color: grey }} />
          </Link> */}
          <Link className={cx("logo")} to={ROUTES.SETTING}>
            <UilSetting className={cx("sideSetting")} style={props.id === 4 ? { color: blue } : { color: grey }} />
          </Link>
          <Link className={cx("logo")} to={ROUTES.NOTIFICATION}>
            <UilBell className={cx("sideNotification")} style={props.id === 5 ? { color: blue } : { color: grey }} />
          </Link>
        </div>
        <div className={cx("sideProfile")}>
          <Link className={cx("logo")} to={ROUTES.PROFILE}>
            <img className={cx("sideUser")} src={img_url} alt="user_profile_img" />
          </Link>

          <Link className={cx("logo")} to={ROUTES.HOME} onClick={logOut}>
            <UilSignOutAlt className={cx("sideLogout")} />
          </Link>
        </div>
      </div>
      <OpenSideBar isActive={isActive} id={props.id} />
    </>
  );
}

export default Sidebar;

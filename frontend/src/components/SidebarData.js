// Filename - components/SidebarData.js

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as ImIcons from "react-icons/im";
import * as PiIcons from "react-icons/pi";

export const SidebarData = [
    {
        title: "Dashboard",
        path: "/",
        icon: <RiIcons.RiDashboardLine />,
    },
    {
        title: "Shop",
        path: "/shop",
        icon: <Fa6Icons.FaBagShopping />,
    },
    {
        title: "Orders",
        path: "/admin/orderlist",
        icon: <RiIcons.RiListUnordered />,
    },
    {
        title: "Users",
        path: "/admin/userlist",
        icon: <PiIcons.PiUsersThree />,
    },
    {
        title: "Products",
        path: "/admin/productlist",
        icon: <RiIcons.RiListIndefinite />,
    },
    {
        title: "Inventory",
        path: "/admin/inventory",
        icon: <MdIcons.MdOutlineInventory />,
    },
    {
        title: "Profile",
        path: "/profile",
        icon: <ImIcons.ImProfile />,
    },
    // {
    //     title: "Events",
    //     path: "/events",
    //     icon: <FaIcons.FaEnvelopeOpenText />,

    //     iconClosed: <RiIcons.RiArrowDownSFill />,
    //     iconOpened: <RiIcons.RiArrowUpSFill />,

    // },
    // {
    //     title: "Support",
    //     path: "/support",
    //     icon: <IoIcons.IoMdHelpCircle />,
    // },
];

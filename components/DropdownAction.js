import { Dropdown, Option } from "@fluentui/react-components";
import React from "react";

const options = ["Verified", "Pending", "Rejected"];

export default function DropdownAction({ curr_val = "Pending" }) {
    return (
        <Dropdown defaultValue={curr_val}>
            {options.map((op, key) => (
                <Option key={key}>{op}</Option>
            ))}
        </Dropdown>
    );
}

/*
 * This program and the accompanying materials are made available under the terms of the *
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at *
 * https://www.eclipse.org/legal/epl-v20.html                                      *
 *                                                                                 *
 * SPDX-License-Identifier: EPL-2.0                                                *
 *                                                                                 *
 * Copyright Contributors to the Zowe Project.                                     *
 *                                                                                 *
 */

import * as globals from "../globals";
import { IZoweNodeType } from "@zowe/zowe-explorer-api";

export interface IProfileAndDataSet {
    profileName: string;
    dataSetName: string;
}

export interface INodeLabels extends IProfileAndDataSet {
    memberName: string;
}

export function getProfileAndDataSetName(node: IZoweNodeType): IProfileAndDataSet {
    const profileName = node.getParent().getLabel().toString();
    const dataSetName = node.label.toString();
    return { profileName, dataSetName };
}

export function getNodeLabels(node: IZoweNodeType): INodeLabels {
    if (node.contextValue.includes(globals.DS_MEMBER_CONTEXT)) {
        return { ...getProfileAndDataSetName(node.getParent()), memberName: node.getLabel().toString() };
    } else {
        return { ...getProfileAndDataSetName(node), memberName: undefined };
    }
}

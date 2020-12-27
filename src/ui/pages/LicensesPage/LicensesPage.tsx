import * as React from "react";
import { AppTitle, PageWrapper } from "ui/common";
import { PageTabs } from "ui/common/PageTabs/PageTabs";

export function LicensesPage() {
    return <PageWrapper>
        <AppTitle />
        <PageTabs />
        <pre>
            /*
            object-assign
            (c) Sindre Sorhus
            @license MIT
            */

            /** @license React v0.20.1
            * scheduler.production.min.js
            *
            * Copyright (c) Facebook, Inc. and its affiliates.
            *
            * This source code is licensed under the MIT license found in the
            * LICENSE file in the root directory of this source tree.
            */

            /** @license React v16.13.1
            * react-is.production.min.js
            *
            * Copyright (c) Facebook, Inc. and its affiliates.
            *
            * This source code is licensed under the MIT license found in the
            * LICENSE file in the root directory of this source tree.
            */

            /** @license React v17.0.1
            * react-dom.production.min.js
            *
            * Copyright (c) Facebook, Inc. and its affiliates.
            *
            * This source code is licensed under the MIT license found in the
            * LICENSE file in the root directory of this source tree.
            */

            /** @license React v17.0.1
            * react.production.min.js
            *
            * Copyright (c) Facebook, Inc. and its affiliates.
            *
            * This source code is licensed under the MIT license found in the
            * LICENSE file in the root directory of this source tree.
            */
        </pre>
    </PageWrapper>;
}
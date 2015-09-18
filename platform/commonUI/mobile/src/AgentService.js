/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define,Promise*/

/**
 * Provides features which support variant behavior on mobile devices.
 *
 * @namespace platform/commonUI/mobile
 */
define(
    [],
    function () {
        "use strict";

        /**
         * The query service handles calls for browser and userAgent
         * info using a comparison between the userAgent and key
         * device names
         * @constructor
         * @param $window Angular-injected instance of the window
         * @memberof platform/commonUI/mobile
         */
        function AgentService($window) {
            var userAgent = $window.navigator.userAgent,
                matches = ua.match(/iPad|iPhone|Android/i) || [];

            this.mobileName = matches[0];
            this.$window = $window;
        }

        /**
         * Check if the user is on a mobile device.
         * @returns {boolean} true on mobile
         */
        AgentService.prototype.isMobile = function () {
            return !!this.mobileName;
        };

        /**
         * Check if the user is on a phone-sized mobile device.
         * @returns {boolean} true on a phone
         */
        AgentService.prototype.isPhone = function () {
            // iOS is test-to device for mobile, so only
            // make this distinction for iPhones
            return this.mobileName === 'iPhone';
        };

        /**
         * Check if the user is on a tablet-sized mobile device.
         * @returns {boolean} true on a tablet
         */
        AgentService.prototype.isTablet = function () {
            return this.isMobile() && !this.isPhone();
        };

        /**
         * Check if the user's device is in a portrait-style
         * orientation (display width is narrower than display height.)
         * @returns {boolean} true in portrait mode
         */
        AgentService.prototype.isPortrait = function () {
            return $window.innerWidth < $window.innerHeight;
        };

        /**
         * Check if the user's device is in a landscape-style
         * orientation (display width is greater than display height.)
         * @returns {boolean} true in landscape mode
         */
        AgentService.prototype.isLandscape = function () {
            return !this.isPortrait();
        };

        return AgentService;
    }
);

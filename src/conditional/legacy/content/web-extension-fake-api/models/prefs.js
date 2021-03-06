/*
 * ***** BEGIN LICENSE BLOCK *****
 *
 * RequestPolicy - A Firefox extension for control over cross-site requests.
 * Copyright (c) 2008 Justin Samuel
 * Copyright (c) 2014 Martin Kimmerle
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * ***** END LICENSE BLOCK *****
 */

import {PrefBranch}
    from "content/web-extension-fake-api/lib/classes/pref-branch";

// =============================================================================
// Prefs
// =============================================================================

export const Prefs = (function() {
  let self = {};

  self.save = function() {
    Services.prefs.savePrefFile(null);
  };

  self.branches = {
    rp: new PrefBranch("extensions.requestpolicy.", {
      "autoReload": "BoolPref",
      "confirmSiteInfo": "BoolPref",
      "contextMenu": "BoolPref",
      "defaultPolicy.allow": "BoolPref",
      "defaultPolicy.allowSameDomain": "BoolPref",
      "defaultPolicy.allowTopLevel": "BoolPref",
      "indicateBlacklistedObjects": "BoolPref",
      "indicateBlockedObjects": "BoolPref",
      "keyboardShortcuts.openMenu.enabled": "BoolPref",
      "keyboardShortcuts.openMenu.combo": "CharPref",
      "keyboardShortcuts.openRequestLog.enabled": "BoolPref",
      "keyboardShortcuts.openRequestLog.combo": "CharPref",
      "lastAppVersion": "CharPref",
      "lastVersion": "CharPref",
      "log": "BoolPref",
      "log.level": "IntPref",
      "menu.info.showNumRequests": "BoolPref",
      "menu.sorting": "CharPref",
      "prefetch.dns.disableOnStartup": "BoolPref",
      "prefetch.dns.restoreDefaultOnUninstall": "BoolPref",
      "prefetch.link.disableOnStartup": "BoolPref",
      "prefetch.link.restoreDefaultOnUninstall": "BoolPref",
      "prefetch.preconnections.disableOnStartup": "BoolPref",
      "prefetch.preconnections.restoreDefaultOnUninstall": "BoolPref",
      "privateBrowsingPermanentWhitelisting": "BoolPref",
      "startWithAllowAllEnabled": "BoolPref",
      "welcomeWindowShown": "BoolPref",
    }),

    root: new PrefBranch("", {
      "network.dns.disablePrefetch": "BoolPref",
      "network.dns.disablePrefetchFromHTTPS": "BoolPref",
      "network.http.speculative-parallel-limit": "IntPref",
      "network.prefetch-next": "BoolPref",
    }),
  };

  /**
   * Translate an alias into a real prefName, and also return the branch.
   *
   * Valid "fake pref names" are:
   *   - "root/ network.prefetch-next" (root pref branch)
   *   - "welcomeWindowShown" (RequestPolicy pref branch)
   *
   * @param {string} aFakePrefName
   * @return {Object}
   */
  function getBranchAndRealName(aFakePrefName) {
    if (aFakePrefName.startsWith("root/ ")) {
      return {
        branch: self.branches.root,
        name: aFakePrefName.slice(6),
      };
    }
    return {
      branch: self.branches.rp,
      name: aFakePrefName,
    };
  }

  self.get = function(aFakePrefName) {
    let {branch, name} = getBranchAndRealName(aFakePrefName);
    return branch.get(name);
  };

  self.set = function(aFakePrefName, aValue) {
    let {branch, name} = getBranchAndRealName(aFakePrefName);
    return branch.set(name, aValue);
  };

  self.reset = function(aFakePrefName) {
    let {branch, name} = getBranchAndRealName(aFakePrefName);
    return branch.reset(name);
  };

  self.isSet = function(aFakePrefName) {
    let {branch, name} = getBranchAndRealName(aFakePrefName);
    return branch.isSet(name);
  };

  // ---------------------------------------------------------------------------
  // Observer functions
  // ---------------------------------------------------------------------------

  /**
   * Notes about addObserver and removeObserver:
   *
   * The functions take fake domain names, but the actual observers
   * will get the "real" pref names / domain names. If translation
   * of names is needed, the two functions could be replaced by
   * "addListener" and "removeListener" functions. In other words,
   * the "domainsToObservers" object in "PrefObserver" could be moved
   * here, and "PrefObserver" would only manage the listeners per
   * environment.
   *
   * The addObserver and removeObserver functions are preixed with
   * an underscore because they shouldn't be used directly, only
   * by PrefObserver.
   */

  self._addObserver = function(aFakeDomain, aObserver, aHoldWeak) {
    let {branch, name: domain} = getBranchAndRealName(aFakeDomain);
    return branch.addObserver(domain, aObserver, aHoldWeak);
  };

  self._removeObserver = function(aFakeDomain, aObserver) {
    let {branch, name: domain} = getBranchAndRealName(aFakeDomain);
    return branch.removeObserver(domain, aObserver);
  };

  return self;
})();

// =============================================================================
// Prefs - Aliases
// =============================================================================

(function(self) {
  // ---------------------------------------------------------------------------
  // Other aliases
  // ---------------------------------------------------------------------------

  self.isPrefetchEnabled = function() {
    return self.get("root/ network.prefetch-next") ||
        !self.get("root/ network.dns.disablePrefetch");
  };

  function isOldRulePrefEmpty(pref) {
    try {
      let value = self.branches.rp.branch.
          getComplexValue(pref, Ci.nsISupportsString).data;
      return value === "";
    } catch (e) {
      return true;
    }
  }

  self.oldRulesExist = function() {
    return !(isOldRulePrefEmpty("allowedOrigins") &&
             isOldRulePrefEmpty("allowedDestinations") &&
             isOldRulePrefEmpty("allowedOriginsToDestinations"));
  };
})(Prefs);

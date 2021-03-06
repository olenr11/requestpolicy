"use strict";

/* eslint-disable max-len */
/* global pref, setGenericPref, setUCharPref */ // eslint-disable-line no-unused-vars

pref("extensions.requestpolicy.log", false);
pref("extensions.requestpolicy.log.level", 0);

pref("extensions.requestpolicy.autoReload", true);

pref("extensions.requestpolicy.defaultPolicy.allow", false);
pref("extensions.requestpolicy.defaultPolicy.allowSameDomain", true);
pref("extensions.requestpolicy.defaultPolicy.allowTopLevel", false);

pref("extensions.requestpolicy.welcomeWindowShown", false);

pref("extensions.requestpolicy.indicateBlockedObjects", true);
pref("extensions.requestpolicy.indicateBlacklistedObjects", false);
pref("extensions.requestpolicy.startWithAllowAllEnabled", false);
pref("extensions.requestpolicy.privateBrowsingPermanentWhitelisting", false);

pref("extensions.requestpolicy.prefetch.link.disableOnStartup", true);
pref("extensions.requestpolicy.prefetch.link.restoreDefaultOnUninstall", true);
pref("extensions.requestpolicy.prefetch.dns.disableOnStartup", true);
pref("extensions.requestpolicy.prefetch.dns.restoreDefaultOnUninstall", true);
pref("extensions.requestpolicy.prefetch.preconnections.disableOnStartup", true);
pref("extensions.requestpolicy.prefetch.preconnections.restoreDefaultOnUninstall", true);

pref("extensions.requestpolicy.contextMenu", true);
pref("extensions.requestpolicy.menu.sorting", "numRequests");
pref("extensions.requestpolicy.menu.info.showNumRequests", true);

pref("extensions.requestpolicy.confirmSiteInfo", true);

pref("extensions.requestpolicy.keyboardShortcuts.openMenu.enabled", true);
pref("extensions.requestpolicy.keyboardShortcuts.openMenu.combo", "default");
pref("extensions.requestpolicy.keyboardShortcuts.openRequestLog.enabled", true);
pref("extensions.requestpolicy.keyboardShortcuts.openRequestLog.combo", "default");

pref("extensions.requestpolicy.lastVersion", "0.0");
pref("extensions.requestpolicy.lastAppVersion", "0.0");

// Old prefs that are no longer used.
// pref("extensions.requestpolicy.allowedOrigins", "");
// pref("extensions.requestpolicy.allowedDestinations", "");
// pref("extensions.requestpolicy.allowedOriginsToDestinations", "");
// pref("extensions.requestpolicy.statusbarIcon", "standard");
// pref("extensions.requestpolicy.initialSetupDialogShown", false);

/* eslint-enable max-len */

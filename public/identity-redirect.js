/**
 * Netlify Identity email-flow redirect
 * When a user lands on the site root with an Identity token in the URL hash
 * (e.g. from password reset, invite, confirmation, email-change emails),
 * redirect to /admin/ with the same hash so Decap CMS can consume the token.
 * Hash fragments are client-side only and cannot be redirected by Netlify.
 */
(function () {
  var pathname = window.location.pathname || "/";
  var hash = window.location.hash || "";
  if (pathname !== "/" && pathname !== "") return;

  var identityTokenNames = [
    "recovery_token",
    "invite_token",
    "confirmation_token",
    "email_change_token",
    "token",
    "access_token",
  ];
  try {
    var params = new URLSearchParams(hash.slice(1));
    for (var i = 0; i < identityTokenNames.length; i++) {
      if (params.has(identityTokenNames[i])) {
        window.location.replace("/admin/" + hash);
        return;
      }
    }
  } catch (_) {}
})();

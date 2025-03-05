// Toast behavior for directing users to their offer/in-progress application
export class ResumeApplicationToast {
  static isVisible = false;
  static prequalDomain = null;

<<<<<<< HEAD
<<<<<<< HEAD
  constructor(prequalDomain = null) {
    ResumeApplicationToast.prequalDomain = prequalDomain || this.determinePrequalDomain();
    this.init();
  }

  determinePrequalDomain() {
    try {
      const hostname = window.location.hostname;
      if (hostname.includes(".dev")) {
        return "https://get.point.dev";
      }
      return "https://get.point.com";
    } catch (error) {
      Bugsnag.notify(error, {
        severity: "error",
        context: "ResumeApplicationToast.determinePrequalDomain",
        metaData: {
          hostname: window.location?.hostname,
        },
      });
      // Default to production domain as fallback
      return "https://get.point.com";
    }
  }

=======
  constructor(prequalDomain = "https://get.point.com") {
    ResumeApplicationToast.prequalDomain = prequalDomain;
    this.init();
  }

>>>>>>> e123a83 (Updated build w/ seperate file for toast.)
=======
  constructor(prequalDomain = null) {
    ResumeApplicationToast.prequalDomain = prequalDomain || this.determinePrequalDomain();
    this.init();
  }

  determinePrequalDomain() {
    // Get the current hostname (e.g., "www.point.com" or "www.point.dev")
    const hostname = window.location.hostname;

    // Check if we're on a .dev domain
    if (hostname.includes(".dev")) {
      return "https://get.point.dev";
    }

    // Default to .com domain
    return "https://get.point.com";
  }

>>>>>>> 92fb4c6 (Dynamically determine prequalDomain based on current page TLD)
  async init() {
    try {
      const data = await ResumeApplicationToast.fetchVisitorData();
      if (data) {
        this.updateToast(data);
      }
    } catch (error) {
      Bugsnag.notify(error, {
        severity: "error",
        context: "ResumeApplicationToast.init",
        metaData: {
          prequalDomain: ResumeApplicationToast.prequalDomain,
        },
      });
      console.error("Error initializing ResumeApplicationToast:", error);
    }
  }

  static async fetchVisitorData() {
    try {
      const url = ResumeApplicationToast.prequalDomain + "/api/v1/visitors";
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      Bugsnag.notify(error, {
        severity: "error",
        context: "ResumeApplicationToast.fetchVisitorData",
        metaData: {
          url: ResumeApplicationToast.prequalDomain + "/api/v1/visitors",
        },
      });
      console.error("Error fetching visitor data:", error);
      return null;
    }
  }

  static async fetchRedirectLink() {
    const url = ResumeApplicationToast.prequalDomain + "/api/v2/estimates/resume";
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      Bugsnag.notify(error, {
        severity: "error",
        context: "ResumeApplicationToast.fetchRedirectLink",
        metaData: {
          url: url,
        },
      });
      console.error("Error fetching redirect link:", error);
      return null;
    }
  }

  updateToast(visitor) {
    try {
      if (!visitor) return;

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    // Only show toast if visitor has relevant state
    const hasRelevantState = visitor.hasActiveDocket || visitor.estimateKey;
    if (!hasRelevantState) return;
=======
    // Check for specific visitor states that should trigger the offer toast
    const shouldShowOffer = (visitor.hasActiveDocket && !visitor.hasActiveApplicantFlow) || visitor.hasActiveDocket || visitor.estimateKey;

    if (!shouldShowOffer) return;
>>>>>>> 0e27fed (refactor: Improve toast visibility logic in ResumeApplicationToast)

>>>>>>> 2ff7593 (Update ResumeApplicationToast to only show toast-offer if visitor has relevant state)
    // Find the toast elements
    const toastMail = document.querySelector("#toast-mail");
    const toastOffer = document.querySelector("#toast-offer");
=======
      // Check for specific visitor states that should trigger the offer toast
      const shouldShowOffer = (visitor.hasActiveDocket && !visitor.hasActiveApplicantFlow) || visitor.hasActiveDocket || visitor.estimateKey;

      if (!shouldShowOffer) return;

      // Find the toast elements
      const toastMail = document.querySelector("#toast-mail");
      const toastOffer = document.querySelector("#toast-offer");
>>>>>>> 7ac3aab (feat: Add Bugsnag error tracking to ResumeApplicationToast)

      if (!toastOffer) {
        throw new Error("Toast offer element not found");
      }

      // Only now that we know we'll show the offer toast, hide the mail toast
      if (toastMail) toastMail.style.display = "none";
      toastOffer.style.display = "flex";

      // Update link destination for the offer toast link
      const offerLink = toastOffer.querySelector("a");
      if (offerLink) {
        offerLink.addEventListener("click", async (e) => {
          e.preventDefault();
          try {
            const response = await ResumeApplicationToast.fetchRedirectLink();
            if (response && response.url) {
              window.location.assign(response.url);
            } else {
              Bugsnag.notify(new Error("No redirect URL received"), {
                severity: "warning",
                context: "ResumeApplicationToast.updateToast.clickHandler",
                metaData: {
                  response: response,
                },
              });
              // Fallback to default behavior if no URL is received
              window.location.href = offerLink.getAttribute("href");
            }
          } catch (error) {
            Bugsnag.notify(error, {
              severity: "error",
              context: "ResumeApplicationToast.updateToast.clickHandler",
              metaData: {
                fallbackUrl: offerLink.getAttribute("href"),
              },
            });
            console.error("Error redirecting to application:", error);
            // Fallback to default behavior on error
            window.location.href = offerLink.getAttribute("href");
          }
        });
      }

<<<<<<< HEAD
    ResumeApplicationToast.isVisible = true;
=======
    // Find the toast elements we want to update
    const toastElement = document.querySelector("#toast");
    if (!toastElement) return;
=======
    // Find the toast elements
    const toastMail = document.querySelector("#toast-mail");
    const toastOffer = document.querySelector("#toast-offer");
>>>>>>> d05d4d3 (Enhance build process and add Prettier ignore configuration)

    if (!toastOffer) return;

    // Show offer toast and hide mail toast
    if (toastMail) toastMail.style.display = "none";
    toastOffer.style.display = "flex";

    // Update link destination for the offer toast link
    const offerLink = toastOffer.querySelector("a");
    if (offerLink) {
      offerLink.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          const response = await ResumeApplicationToast.fetchRedirectLink();
          if (response && response.url) {
            window.location.assign(response.url);
          } else {
            console.error("No redirect URL received");
            // Fallback to default behavior if no URL is received
            window.location.href = offerLink.getAttribute("href");
          }
        } catch (error) {
          console.error("Error redirecting to application:", error);
          // Fallback to default behavior on error
          window.location.href = offerLink.getAttribute("href");
        }
      });
    }
<<<<<<< HEAD
>>>>>>> e123a83 (Updated build w/ seperate file for toast.)
=======

    ResumeApplicationToast.isVisible = true;
>>>>>>> d05d4d3 (Enhance build process and add Prettier ignore configuration)
=======
      ResumeApplicationToast.isVisible = true;
    } catch (error) {
      Bugsnag.notify(error, {
        severity: "error",
        context: "ResumeApplicationToast.updateToast",
        metaData: {
          visitor: visitor,
          isVisible: ResumeApplicationToast.isVisible,
        },
      });
      console.error("Error updating toast:", error);
    }
>>>>>>> 7ac3aab (feat: Add Bugsnag error tracking to ResumeApplicationToast)
  }
}

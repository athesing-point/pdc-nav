// Toast behavior for directing users to their offer/in-progress application
export class ResumeApplicationToast {
  static isVisible = false;
  static prequalDomain = null;

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

  async init() {
    try {
      // Add transition styles to toasts
      const toastContainer = document.querySelector("#toast");
      const toastMail = document.querySelector("#toast-mail");
      const toastOffer = document.querySelector("#toast-offer");

      if (toastContainer) {
        Object.assign(toastContainer.style, {
          transition: "all 0.3s ease-in-out",
          opacity: "1",
          height: "3.5rem",
          overflow: "hidden",
        });
      }

      if (toastMail) {
        Object.assign(toastMail.style, {
          transition: "all 0.3s ease-in-out",
          opacity: "1",
          transform: "translateY(0)",
          display: "flex",
          position: "relative",
        });
      }

      if (toastOffer) {
        Object.assign(toastOffer.style, {
          transition: "all 0.3s ease-in-out",
          opacity: "0",
          transform: "translateY(-100%)",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          display: "flex",
          visibility: "hidden",
        });
      }

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

      // Check for specific visitor states that should trigger the offer toast
      const shouldShowOffer = (visitor.hasActiveDocket && !visitor.hasActiveApplicantFlow) || visitor.hasActiveDocket || visitor.estimateKey;

      if (!shouldShowOffer) return;

      // Find the toast elements
      const toastContainer = document.querySelector("#toast");

      // Early return if toast container doesn't exist
      if (!toastContainer) return;

      const toastMail = document.querySelector("#toast-mail");
      const toastOffer = document.querySelector("#toast-offer");

      if (!toastOffer) return;

      // Make offer toast visible but still transparent before transition
      toastOffer.style.visibility = "visible";

      // Smoothly transition between toasts
      if (toastMail) {
        toastMail.style.opacity = "0";
        toastMail.style.transform = "translateY(-100%)";
      }

      // Show the offer toast with a slight delay to allow for the mail toast to fade out
      setTimeout(() => {
        if (toastOffer) {
          toastOffer.style.opacity = "1";
          toastOffer.style.transform = "translateY(0)";
        }
        // Clean up the mail toast after transition
        if (toastMail) {
          toastMail.style.display = "none";
        }
      }, 300);

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
  }
}

// Toast behavior for directing users to their offer/in-progress application
export class ResumeApplicationToast {
  static isVisible = false;
  static prequalDomain = null;

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

  async init() {
    try {
      const data = await ResumeApplicationToast.fetchVisitorData();
      if (data) {
        this.updateToast(data);
      }
    } catch (error) {
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
      console.error("Error fetching redirect link:", error);
      return null;
    }
  }

  updateToast(visitor) {
    if (!visitor) return;

    // Find the toast elements
    const toastMail = document.querySelector("#toast-mail");
    const toastOffer = document.querySelector("#toast-offer");

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

    ResumeApplicationToast.isVisible = true;
  }
}

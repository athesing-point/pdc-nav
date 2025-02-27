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

    // Find the toast elements we want to update
    const toastElement = document.querySelector("#toast");
    if (!toastElement) return;

    // Find the links in the toast
    const toastLinks = toastElement.querySelectorAll("a");
    if (!toastLinks || toastLinks.length === 0) return;

    let message = null;
    let actionText = null;

    if (visitor.hasActiveDocket && !visitor.hasActiveApplicantFlow) {
      message = "Looks like you previously started an application";
      actionText = "Check status";
    } else if (visitor.hasActiveDocket) {
      message = "Looks like you previously started an application";
      actionText = "Resume Application";
    } else if (visitor.estimateKey) {
      message = "You have a recently created offer";
      actionText = "View latest offer";
    }

    if (message && actionText) {
      // Update the toast text
      const textElements = toastElement.querySelectorAll(".text-link-soft_underline");
      if (textElements && textElements.length > 0) {
        textElements.forEach((element) => {
          element.textContent = message;
        });
      }

      // Update link destination for all links
      toastLinks.forEach((link) => {
        link.addEventListener("click", async (e) => {
          e.preventDefault();
          try {
            const response = await ResumeApplicationToast.fetchRedirectLink();
            if (response && response.url) {
              window.location.assign(response.url);
            } else {
              console.error("No redirect URL received");
              // Fallback to default behavior if no URL is received
              window.location.href = link.getAttribute("href");
            }
          } catch (error) {
            console.error("Error redirecting to application:", error);
            // Fallback to default behavior on error
            window.location.href = link.getAttribute("href");
          }
        });
      });

      ResumeApplicationToast.isVisible = true;
    }
  }
}

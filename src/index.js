/**
 * Window Event Manager (singleton)
 */
class WindowEventManager {
  constructor(debug = false) {
    this._listeners = new Map();
    this.debug = debug;
  }

  /**
   * Get associated listeners for the type provided in args
   * @param {string} type - A case-sensitive string representing the event type to use for getting the associated listeners
   */
  getListenerDetailsByType(type) {
    return this._listeners.get(type);
  }

  /**
   * Add event listener on specific target
   * @param {Element} target - An element to attach the listener
   * @param {string} type    - A case-sensitive string representing the event type to listen for
   * @param listener         - An event listener callback
   */
  addEventListener(target = window, type, listener) {
    let details = [{target, listener}];
    if (this._listeners.size) {
      const currentListenerDetailsForType = this.getListenerDetailsByType(type);
      if (Array.isArray(currentListenerDetailsForType) && currentListenerDetailsForType.length) {
        details = [...details, ...currentListenerDetailsForType];
      }
    }
    this._listeners.set(type, details);
    target.addEventListener(type, listener);

    if (this.debug) console.debug(`The event listener for the type: ${type} has been added for the target: ${target}`);
  }

  /**
   * Remove all the event listeners by the type provided in args
   * @param {string} type               - A case-sensitive string representing the event type to use for remove the
   *                                      associated listeners
   * @param {boolean} basicCheckProcess - A boolean that determines if we need to execute the basic check up process
   */
  removeEventListenersByType(type, basicCheckProcess = true) {
    if (basicCheckProcess && !this._listeners.size) {
      console.warn("No listener saved");
      return;
    }

    const currentListenerDetailsForType = this.getListenerDetailsByType(type);

    if (!Array.isArray(currentListenerDetailsForType) || !currentListenerDetailsForType.length) {
      console.warn(`No listener saved for the type ${type}`);
      return;
    }

    for (const { target, listener } of currentListenerDetailsForType) {
      target.removeEventListener(type, listener);
    }

    this._listeners.delete(type);

    if (this.debug) console.debug(`All listeners for the type ${type} has been removed`)
  }

  /**
   * Remove all the event listeners for each type provided in args
   * @param {Array} types               - An array of case-sensitive strings representing the event type to use for
   *                                      remove the associated listeners
   */
  removeEventListenersByTypes(types = []) {
    if (!this._listeners.size) {
      console.warn("No listener saved");
      return;
    }

    for (const type of types) {
      this.removeEventListenersByType(type, false);
    }

    if (this.debug) console.debug(`All listeners for the following types: ${JSON.stringify(types)} has been removed`)
  }

  removeEventListenersByTarget(target, basicCheckProcess = true) {
    if (basicCheckProcess && !this._listeners.size) {
      console.warn("No listener saved");
      return;
    }

    for (const type of this._listeners.keys()) {
      const details = this.getListenerDetailsByType(type);
      const updatedDetails = []; // Immutability
      details.forEach(value => {
        if (value.target === target) {
          value.target.removeEventListener(type, value.listener);
        }
        else {
          updatedDetails.push(value);
        }
      });
      if (updatedDetails.length) this._listeners.set(type, updatedDetails);
    }
  }

  removeEventListenersByTargets(targets = []) {
    if (!this._listeners.size) {
      console.warn("No listener saved");
      return;
    }

    for (const target of targets) {
      this.removeEventListenersByTarget(target, false);
    }

    if (this.debug) console.debug(`All listeners for the following targets: ${JSON.stringify(targets)} has been removed`)
  }
}
module.exports.WindowEventManager = new WindowEventManager();
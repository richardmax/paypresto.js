/**
 * TODO
 */
class Embed {
  /**
   * TODO
   * @param {DOMString} sel CSS selector string
   * @param {Object} options UI options
   * @constructor
   */
  constructor(sel, options = {}) {
    this.$el = document.querySelector(sel)
    this.$iframe = document.createElement('iframe')
    this.options = options    

    if (!this.$el) {
      throw new Error(`Element '${sel}' not found. Could not mount Proxypay.`)
    }
  }

  /**
   * TODO
   * @param {Presto} payment Presto payment instance
   * @async
   * @returns {Promise}
   */
  async mount(payment) {
    this.$iframe.frameBorder = '0'
    this.$iframe.style.width = '100%'
    this.$iframe.style.maxWidth = '760px'
    this.$iframe.style.height = '640px'

    if (this.options.transparent) {
      this.$iframe.style.backgroundColor = 'transparent'
      this.$iframe.allowTransparency = 'true'
    }

    return new Promise((resolve, reject) => {
      payment.once('invoice', invoice => {
        this.$el.innerHTML = ''
        this.$el.appendChild(this.$iframe)
        this.$iframe.setAttribute('src', invoice.invoice_url)
        this.$iframe.onload = _ => resolve(this)
        this.$iframe.onerror = reject
      })
    })
  }
}



export default function(sel, options = {}) {
  return new Embed(sel, options)
}
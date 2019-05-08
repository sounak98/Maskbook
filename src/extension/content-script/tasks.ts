import { AutomatedTabTask, LiveSelector, MutationObserverWatcher } from '@holoflows/kit'
import { sleep, dispatchCustomEvents, timeout, untilDocumentReady } from '../../utils/utils'

const bioCard = new LiveSelector().querySelector<HTMLDivElement>('#profile_timeline_intro_card')
/**
 * Access: https://www.facebook.com/
 * @param text
 */
export async function pasteIntoPostBox(text: string, warningText: string) {
    await untilDocumentReady()
    const scrolling = document.scrollingElement || document.documentElement
    const scroll = (top => () => scrolling.scroll({ top }))(scrolling.scrollTop)

    const notActivated = new LiveSelector()
        .querySelector(`[role="region"]`)
        .querySelector<HTMLTextAreaElement | HTMLDivElement>('textarea, [aria-multiline="true"]')
    const activated = new LiveSelector().querySelector<HTMLDivElement>('.notranslate')
    const dialog = activated.clone().unstable_closest(`[role="dialog"]`)
    await sleep(2000)
    // If page is just loaded
    if (!activated.evaluateOnce()[0]) {
        try {
            console.log('Awaiting to click the post box')
            const [dom] = await timeout(new MutationObserverWatcher(notActivated).once(), 2500)
            console.log('Non-activated post box found', dom)
            await sleep(1500)
            dom.click()
            if (!dialog.evaluateOnce()[0]) throw new Error('Click not working')
        } catch {
            alert('Click the post box please!')
        }
        console.log('Awaiting dialog')
        await new MutationObserverWatcher(dialog).once()
        console.log('Dialog appeared')
    }
    const [element] = activated.evaluateOnce()
    element.focus()
    await sleep(100)
    dispatchCustomEvents('paste', text)
    await sleep(400)
    // Prevent Custom Paste failed, this will cause service not available to user.
    if (element.innerText.indexOf(text) === -1) {
        console.warn('Text not pasted to the text area')
        navigator.clipboard.writeText(text)
        alert(warningText)
    }

    scroll()
}
export default AutomatedTabTask(
    {
        /**
         * Access post url
         * Get post content
         */
        async getPostContent() {
            const post = new LiveSelector().querySelector('#contentArea').getElementsByTagName('p')
            const [data] = await new MutationObserverWatcher(post).once(node => node.innerText)
            return data
        },
        /**
         * Access profile page
         * Get bio content
         */
        async getBioContent() {
            const [data] = await new MutationObserverWatcher(bioCard).once(node => node.innerText)
            return data
        },
        /**
         * Access profile page
         * Paste text into bio
         */
        async pasteIntoBio(text: string) {
            const [bioEditButton] = await new MutationObserverWatcher(
                bioCard.clone().querySelector<HTMLAnchorElement>('[data-tooltip-content][href="#"]'),
            ).once()
            await sleep(200)
            bioEditButton.click()

            const [input] = await new MutationObserverWatcher(bioCard.clone().getElementsByTagName('textarea')).once()
            await sleep(200)
            input.focus()
            dispatchCustomEvents('input', input.value + text)
        },
        pasteIntoPostBox,
    },
    { memorable: true },
)!

export async function getMediaStream(): Promise<
  { ok: true; value: MediaStream } | { ok: false; error: 'NotAllowedError' | 'Unknown' }
> {
  try {
    // @ts-ignore
    const Controller = window.CaptureController as any
    const controller = Controller ? new Controller() : void 0

    if (controller) {
      controller.setFocusBehavior('no-focus-change')
    }

    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
      // @ts-ignore
      controller,
    })

    return {
      ok: true,
      value: mediaStream,
    }
  } catch (e) {
    if (e instanceof DOMException && e.name === 'NotAllowedError') {
      return { ok: false, error: 'NotAllowedError' }
    }
    return { ok: false, error: 'Unknown' }
  }
}

import { Player } from "@minecraft/server";

class PlayerUtils {
    private player: Player;
    constructor(player: Player) {
        this.player = player;
    }

    waila() {
        const block = this.player.getBlockFromViewDirection({ maxDistance: 8 })?.block;
        if (block) {
            this.player.onScreenDisplay.setActionBar(`Id: ${block.typeId}`)
        }
    }
}

export default PlayerUtils;
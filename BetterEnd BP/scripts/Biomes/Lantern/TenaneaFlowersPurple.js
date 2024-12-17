import { world } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:tenanea_flowers_purple', {
        onPlayerDestroy({ block, player }) {
            const plantUtils = new PlantUtils(block, player);
            plantUtils.onBreak('betterend:tenanea_flowers_purple');
        },
        onTick({ block }) {
            const tenaneaFlowers = new TenaneaFlowers(block);
            tenaneaFlowers.setTexture();
        }
    });
});
class TenaneaFlowers {
    constructor(block) {
        this.block = block;
        this.middle = block.isAir ? null : block.permutation.withState('betterend:top', false);
        this.top = block.isAir ? null : block.permutation.withState('betterend:top', true);
    }
    setTexture() {
        const block = this.block;
        const { dimension, location } = block;
        const down = { x: location.x, y: location.y - 1, z: location.z };
        const blockDown = dimension.getBlock(down);
        if (blockDown.isAir)
            this.top ? block.setPermutation(this?.top) : null;
        else
            this.middle ? block.setPermutation(this?.middle) : null;
    }
}

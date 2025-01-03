import { world, Block, Player, ItemStack } from "@minecraft/server";
import WoodUtils from "Biomes/WoodUtils";

world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:tree_log', {
        onPlayerInteract({ block, player }) {
            const woodUtils = new WoodUtils(block, player);
            woodUtils.convertToStripped();
        }
    });
});
import { world } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
const structures = ["lanceleaf1", "lanceleaf2"];
world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:lanceleaf_seed', {
        onPlayerDestroy({ block, player }) {
            new PlantUtils(block, player).onBreakSeeds('betterend:lanceleaf_seed');
        },
        onPlayerInteract({ block, player }) {
            const offset = {
                x: block.location.x + 0,
                y: block.location.y + 0,
                z: block.location.z + 0
            };
            new PlantUtils(block, player).boneMealGrowth(4, true, structures, offset);
        },
        onRandomTick({ block }) {
            const offset = {
                x: block.location.x + 0,
                y: block.location.y + 0,
                z: block.location.z + 0
            };
            new PlantUtils(block).randomTickinigGrowth(4, true, structures, offset);
        },
    });
});

import { world } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";
world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:chorus_grass', {
        onPlace({ block }) {
            new PlantUtils(block).onPlace([0, 1, 2, 3, 4, 5, 6, 7]);
        },
        onPlayerDestroy({ block, player }) {
            new PlantUtils(block, player).onBreak('betterend:chorus_grass');
        }
    });
});

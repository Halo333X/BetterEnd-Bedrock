import { BlockPermutation, world } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

const blockIndex = {
  "betterend:clawfern": {
    random: 1,
  },
  "betterend:globulagus": {
    random: 1
  }
};

world.beforeEvents.worldInitialize.subscribe((data) => {
  data.blockComponentRegistry.registerCustomComponent("betterend:dragon_index", {
    onPlace({ block }) {
      if (blockIndex[block.typeId] && blockIndex[block.typeId].random && !blockIndex[block.typeId].tall) {
        new PlantUtils(block).onPlace(Number(blockIndex[block.typeId].random));
      }
    },
    onPlayerDestroy({ block, player, destroyedBlockPermutation }) {
      if (blockIndex[destroyedBlockPermutation.type.id]) {
        new PlantUtils(block, player).onBreak(destroyedBlockPermutation.type.id);
        blockIndex[destroyedBlockPermutation.type.id].tall &&
          block.dimension.runCommand(
            `setblock ${block.location.x} ${
              block.location.y + (destroyedBlockPermutation.getState("betterend:top") ? -1 : 1)
            } ${block.location.z} air destroy`
          );
      }
    },
  });
});

import { Block, world, BlockComponentTickEvent, Vector3, system } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(e => {
    e.blockComponentRegistry.registerCustomComponent('betterend:portal', {
        onTick(e: BlockComponentTickEvent) {
            const { block, dimension } = e;
            const location = block.location;
            let seconds: number = 0;
            let interval = system.runInterval(() => {
                const player = dimension.getPlayers({ location, maxDistance: 0.6 })[0];
                if (!player) {
                    system.clearRun(interval);
                    seconds = 0;
                    return;
                }
                player.addEffect('nausea', 80, { amplifier: 0, showParticles: false });
                seconds++;
                if (seconds === 5) {
                    const theEnd = world.getDimension('minecraft:the_end');
                    const overworld = world.getDimension('minecraft:overworld');
                    if (dimension.id === 'minecraft:overworld') player.teleport(player.location, { dimension: theEnd });
                    else player.teleport(player.location, { dimension: overworld });
                    system.clearRun(interval);
                }
            }, 20);
        }
    });
});
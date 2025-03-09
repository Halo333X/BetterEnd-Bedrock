import { world, Block, Player, ItemStack, Entity, Vector3, BlockPermutation } from "@minecraft/server";
import PlantUtils from "Biomes/PlantsUtils";

world.beforeEvents.worldInitialize.subscribe(data => {
    data.blockComponentRegistry.registerCustomComponent('betterend:nest', {
        onTick({ block }) {
            const { dimension: dim, location } = block;
            const silkMoths = dim.getEntities({ location, maxDistance: 1.7, type: "betterend:silkmoth" });
            const silkClass = new SilkMoths(block);
            silkClass.setSilks(silkMoths);
            silkClass.generateFiber();
            silkClass.getOffSilks();
        },
        onPlace({ block }) {
            const { dimension, location } = block;
            const fiberId = `fiber:${location.x} ${location.y} ${location.z}`;
            const silkId = `silk:${location.x} ${location.y} ${location.z}`;
            world.setDynamicProperty(fiberId, 0);
            world.setDynamicProperty(silkId, 0);
        },
        onPlayerDestroy({ block }) {
            const silkClass = new SilkMoths(block).destroy();
        },
        onPlayerInteract({ block }) {
            const silkClass = new SilkMoths(block).interact();
        }
    });
});

class SilkMoths {
    private block: Block;
    private loc: Vector3;
    private fiberId: string;
    private silkId: string;
    private maxFiber: number;
    private silkMoth: string;
    constructor(block: Block) {
        this.block= block;
        this.loc = block.location;
        this.maxFiber = 20;
        this.silkMoth = 'betterend:silkmoth';
        this.fiberId = `fiber:${this.loc.x} ${this.loc.y} ${this.loc.z}`;
        this.silkId = `silk:${this.loc.x} ${this.loc.y} ${this.loc.z}`;
    }

    setSilks(silks: Entity[]): void {
        const amount = silks.length;
        if (amount === 0 || Number.isNaN(amount)) return;
        const silksm = world.getDynamicProperty(this.silkId) as number;
        world.setDynamicProperty(this.silkId, silksm + amount);
        this.block.dimension.playSound('block.beehive.enter', this.loc);
        silks.forEach(silk => silk.remove());
    }

    generateFiber() {
        const silks = world.getDynamicProperty(this.silkId) as number;
        const canGenerate = Math.random() > 0.5;
        if (canGenerate) {
            if (silks <= 0) return;
            const fiber = world.getDynamicProperty(this.fiberId) as number;
            const newFiber = (fiber + 1) < this.maxFiber ? fiber + 1 : this.maxFiber;
            world.setDynamicProperty(this.fiberId, newFiber);
            if (newFiber >= this.maxFiber) {
                const fiberPerm = this.block.permutation.withState('betterend:nest', 1);
                this.block.setPermutation(fiberPerm);
            }
        }
    }

    getOffSilks(): void {
        const run = Math.random() > 0.7;
        if (run) {
            const silks = world.getDynamicProperty(this.silkId) as number;
            if (silks <= 0) return;
            this.block.dimension.playSound('block.beehive.exit', this.loc);
            this.block?.dimension.spawnEntity(this.silkMoth, this.block.location);
            world.setDynamicProperty(this.silkId, silks - 1);
        }
    }

    destroy() {
        const silks = world.getDynamicProperty(this.silkId) as number;
        for (let i = 0; i < silks; i++) {
            this.block.dimension.spawnEntity(this.silkMoth, this.loc);
        }
        world.setDynamicProperty(this.silkId, 0);
        world.setDynamicProperty(this.fiberId, 0);
    }

    interact() {
        const hasFiber = this.block.permutation.getState('betterend:nest');
        if (hasFiber === 1) {
            const noFiber = this.block.permutation.withState('betterend:nest', 0);
            world.setDynamicProperty(this.fiberId, 0);
            this.block.setPermutation(noFiber);
        }
    }
}
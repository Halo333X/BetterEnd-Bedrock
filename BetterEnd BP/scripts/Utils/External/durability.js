import { EquipmentSlot, GameMode, ItemStack } from "@minecraft/server";
export function durability(player, item, damage = 1) {
    if (!item?.typeId.startsWith('betterend:') || player.getGameMode() === GameMode.Creative)
        return;
    const durability = item.getComponent('durability');
    const enchantable = item.getComponent('enchantable');
    const unbreaking = enchantable?.getEnchantment('unbreaking')?.level ?? 0;
    if (Math.random() * 100 <= (100 / (unbreaking + 1)))
        durability.damage += damage;
    const equip = player.getComponent('equippable');
    if (durability.damage < durability.maxDurability) {
        equip.setEquipment(EquipmentSlot.Mainhand, item);
    }
    else {
        player.playSound('random.break');
        equip.setEquipment(EquipmentSlot.Mainhand, new ItemStack('air'));
    }
}

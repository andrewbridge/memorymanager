/**
* memoryManager
*
* A manager which allows for a new scope to be created and then manipulated by any method which
* knows the scope name.
*/
MemoryManager = function() {
	this.memory: {};
}

/**
 * newBlock
 * 
 * Creates a new block of memory which is separate from any other scope. Overwrites 
 * any block with the same name.
 * 
 * @param name The name of the scope, if not provided, a unique identifier will be created.
 * @return The name of the scope (needed if one wasn't provided).
 */
MemoryManager.prototype.newBlock = function(name) {
	name = (typeof name != "undefined") ? name : ModsListToolkit.prototype.hashCode(new Date().getTime()).toString();
	this.memory[name] = {};
	return name;
};

/**
 * setData
 * 
 * Sets data to a given variable in a given block. Overwrites any data already set.
 * 
 * @param ref The block identifier.
 * @param key The variable name.
 * @param value The data to set.
 * @return A boolean value as to whether the data was set.
 */
MemoryManager.prototype.setData = function(ref, key, value) {
	if (this.isBlock(ref)) {
		this.memory[ref][key] = value;
		return true;
	}
	return false;
};

/**
 * delData
 * 
 * Remove the given key and the data it's associated with.
 * @param ref The block identifier.
 * @param key The variable name to delete.
 * @return A boolean as to whether the data has been deleted.
 */
MemoryManager.prototype.delData = function(ref, key) {
	return (this.isBlock(ref) && key in this.memory[ref]) ? delete this.memory[ref][key] : true;
};

/**
 * getData
 * 
 * Retrieve the data associated with the given key, if any.
 * @param ref The block identifier.
 * @param key The variable name to retrieve data for.
 * @return If data exists for the given parameters, the data will be returned, otherwise
 * undefined will be returned.
 */
MemoryManager.prototype.getData = function(ref, key) {
	return (this.isBlock(ref) && this.hasData(ref, key)) ? this.memory[ref][key] : undefined;
};

/**
 * hasData
 * 
 * Check if the given key name exists.
 * 
 * @param ref The block identifier.
 * @param key The variable name to check.
 * @return A boolean representing whether the key name exists.
 */
MemoryManager.prototype.hasData = function(ref, key) {
	return (this.isBlock(ref) && key in this.memory[ref]) ? true : false;
};

/**
 * isBlock
 * 
 * Check if the given reference refers to a valid block in memory
 * 
 * @param ref The block identifier.
 * @return A boolean representing whether a block with the given identifier exists.
 */
MemoryManager.prototype.isBlock = function(ref) {
	return (ref in this.memory);
};

/**
 * blockRef
 * 
 * Return a reference to the full block, allowing native manipulation. Useful when
 * accessing the scope multiple times in a method.
 * 
 * @param ref The block identifier.
 * @return If the block is a valid block, the object will be returned (JS is pass-by-reference
 * so all changes will be reflected by the manager) after changes are made.
 */
MemoryManager.prototype.blockRef = function(ref) {
	return (this.isBlock(ref)) ? this.memory[ref] : null;
};

/**
 * destroyBlock
 * 
 * Delete the entire block of memory.
 * 
 * @param ref The block identifier.
 * @return A boolean as to whether the block was successfully deleted (if not, it may not exist).
 */
MemoryManager.prototype.destroyBlock = function(ref) {
	return delete this.memory[ref];
};

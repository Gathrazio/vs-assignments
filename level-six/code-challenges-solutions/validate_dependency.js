/**
 * @description - determine whether the list of tuples creates a valid dependency tree (no circular deps)
 * @difficulty - 5/5
 * 
 * @param {Array<[string, string]>} - array of tuples representing a dependency between two things represented as strings (i.e.  ['A', 'B'] where B depends on A)
 * @returns {Boolean}
 * 
 * @example - validateDependencies([['A','B'], ['B','C']]) // --> true
 * @example - validateDependencies([['A','B'], ['B','A']]) // --> false (B depends on A, which already depends on B, this is circular)
 */

const validateDependencies = (deps) => {

    const graph = {};
    for (let i = 0; i < deps.length; i++) { // the creation of the graph
        const key = deps[i][0];
        if (graph[key]) {
            graph[key].push(deps[i][1])
        } else {
            graph[key] = [deps[i][1]]
        }
    }

    const recursiveDependencyCheck = (key, keyDependency) => { // this function checks if key is a dependency of keyDependency or any of keyDependency's dependencies and returns false if so, true if not so
        if (keyDependency in graph) { // check if the graph has a property that matches the Key's (potentially nth removed) dependency. If it does, call this specific dependency the PotentialContradiction
            for (j = 0; j < graph[keyDependency].length; j++) { // loop through the property that matches the PotentialContradiction
                if (graph[keyDependency][j] === key) { // check whether or not each primary dependency of the PotentialContradiction is the Key. If a primary dependency of PotentialContradiction is the Key, it is true that (1) the PotentialContradiction depends (in a potentially nth removed sense) on the Key, and from just now that (2) the Key also depends on the PotentialContradiction in a primary sense. So the dependency validation should fail; the dependencies tree has a looped branch.
                    return false;
                }
                if (!recursiveDependencyCheck(key, graph[keyDependency][j])) { // if recursiveDependencyCheck returns false at any point, we will return out of every nested instance of recursiveDependencyCheck and eventually return false for the validateDependencies function
                    return false;
                }
            }
        }
        return true;
    }

    // now to actually validate the dependency tree

    for (const key in graph) { // for each key in the graph; for each component that is depended upon by at least one other component. In this syntax, key is the stringified property name -- like 'A'. Call this component the Key
        for (let k = 0; k < graph[key].length; k++) { // for each component that depends directly on the Key; for each of the Key's primary dependencies
            if (!recursiveDependencyCheck(key, graph[key][k])) {
                return false;
            }
        }
    }
    return true;
}

// console.log(validateDependencies([["A","B"],["B","C"],["C","E"],["G","H"],["E","R"],["E","A"]]))

module.exports = validateDependencies;